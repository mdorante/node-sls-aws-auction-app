import AWS from "aws-sdk";
import placeBidSchema from "../lib/schemas/placeBidSchema";
import validator from "@middy/validator";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";
import { dynamodbQuery } from "./getAuctionById";

const dynamo = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
  /*
  Places bid on an existing auction
   */

  const { id } = event.pathParameters;
  const { amount } = event.body;
  const { email } = event.requestContext.authorizer;

  const auction = await dynamodbQuery(id);

  if (auction.status !== "OPEN") {
    throw new createError.Forbidden("This auction is closed!");
  }

  if (email === auction.seller) {
    throw new createError.Forbidden("You can't bid on your own auctions!");
  }

  if (email === auction.highestBid.bidder) {
    throw new createError.Forbidden("You are already the highest bidder!");
  }

  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(
      `You must place a bid higher than ${auction.highestBid.amount}`
    );
  }

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression:
      "set highestBid.amount = :amount, highestBid.bidder = :bidder",
    ExpressionAttributeValues: {
      ":amount": amount,
      ":bidder": email,
    },
    ReturnValues: "ALL_NEW",
  };

  let updatedAuction;

  try {
    const result = await dynamo.update(params).promise();
    updatedAuction = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  };
}

export const handler = commonMiddleware(placeBid).use(
  validator({ inputSchema: placeBidSchema })
);
