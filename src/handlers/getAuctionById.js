import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamo = new AWS.DynamoDB.DocumentClient();

export async function dynamodbQuery(id) {
  let auction;

  try {
    const result = await dynamo
      .get({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id },
      })
      .promise();

    auction = result.Item;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!auction) {
    throw new createError.NotFound(`Auction with ID: "${id}" not found.`);
  }

  return auction;
}

async function getAuctionById(event, context) {
  /*
  Gets auction from DynamoDB (queries by id)
   */
  const { id } = event.pathParameters;
  const auction = await dynamodbQuery(id);

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddleware(getAuctionById);
