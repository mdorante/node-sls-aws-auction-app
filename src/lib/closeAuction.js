import { DynamoDB, SQS } from "aws-sdk";

const dynamo = new DynamoDB.DocumentClient();

export async function closeAuction(auction) {
  const sqs = new SQS();
  const { title, seller, highestBid } = auction;
  const { amount, bidder } = highestBid;

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id: auction.id },
    UpdateExpression: "set #status = :status",
    ExpressionAttributeValues: {
      ":status": "CLOSED",
    },
    ExpressionAttributeNames: {
      "#status": "status",
    },
  };

  await dynamo.update(params).promise();

  if (amount === 0) {
    await sqs
      .sendMessage({
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
          subject: "Your auction closed with no bids.",
          recipient: seller,
          body: `Unfortunately, your item: ${title} has not been sold.\nBetter luck next time!`,
        }),
      })
      .promise();
    return;
  } else {
    const notifySeller = sqs
      .sendMessage({
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
          subject: "Your item has been sold!",
          recipient: seller,
          body: `Congratulations!\nYour item: ${title} has been sold for $${amount}!`,
        }),
      })
      .promise();

    const notifyBidder = sqs
      .sendMessage({
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
          subject: "You won an auction!",
          recipient: bidder,
          body: `Congratulations!\nYou bought: ${title} for ${amount}!`,
        }),
      })
      .promise();

    return Promise.all([notifyBidder, notifySeller]);
  }
}
