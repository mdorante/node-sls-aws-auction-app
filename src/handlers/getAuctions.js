import AWS from "aws-sdk";
import validator from "@middy/validator";
import getAuctionsSchema from "../lib/schemas/getAuctionsSchema";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamo = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  /*
  Gets auctions from DynamoDB (scans whole table)
   */

  const { status } = event.queryStringParameters; // gets the value of status sent in the url query string parameter
  let auctions;

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: "statusAndEndDate",
    KeyConditionExpression: "#status = :status",
    ExpressionAttributeValues: {
      ":status": status,
    },
    ExpressionAttributeNames: {
      "#status": "status",
    },
  };

  try {
    const result = await dynamo.query(params).promise();
    auctions = result.Items;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
}

export const handler = commonMiddleware(getAuctions).use(
  validator({ inputSchema: getAuctionsSchema, useDefaults: true })
);
