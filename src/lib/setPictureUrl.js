import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();

export async function setPictureUrl(id, pictureUrl) {
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: "set pictureUrl = :pictureUrl",
    ExpressionAttributeValues: {
      ":pictureUrl": pictureUrl,
    },
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamo.update(params).promise();
  return result.Attributes;
}
