import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();

export async function getEndedAuctions() {
  const now = new Date();
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: "statusAndEndDate",
    KeyConditionExpression: "#status = :status AND endingAt <= :now",
    ExpressionAttributeValues: {
      ":status": "OPEN",
      ":now": now.toISOString(),
    },
    ExpressionAttributeNames: {
      "#status": "status", // status is a DynamoDB key word, since we use it in our expression, we have to substitute using #status
    },
  };

  const result = await dynamo.query(params).promise();
  return result.Items;
}
