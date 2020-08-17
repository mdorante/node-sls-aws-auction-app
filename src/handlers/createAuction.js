async function createAuction(event, context) {
  /*
  Creates an auction
   */

  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    title,
    status: "OPEN",
    createdAt: now.toISOString(),
  };
  return {
    statusCode: 201, // resource created
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;