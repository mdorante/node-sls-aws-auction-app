import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  /*
  Creates an auction and stores it in DynamoDB
   */

  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    id: uuid(), // generates a random id for the auction
    title,
    status: "OPEN",
    createdAt: now.toISOString(),
  };

  await dynamo
    .put({
      TableName: "AuctionsTable",
      Item: auction,
    })
    .promise();

  return {
    statusCode: 201, // resource created
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;
