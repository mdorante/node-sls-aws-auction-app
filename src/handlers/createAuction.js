import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamo = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  /*
  Creates an auction and stores it in DynamoDB
   */

  const { title } = event.body;
  const now = new Date();
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1); // to set the end of the auction to 1 hour after creation

  const auction = {
    id: uuid(), // generates a random id for the auction
    title,
    status: "OPEN",
    createdAt: now.toISOString(),
    endingAt: endDate.toISOString(),
    highestBid: {
      amount: 0,
    },
  };

  try {
    await dynamo
      .put({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Item: auction,
      })
      .promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201, // resource created
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddleware(createAuction);
