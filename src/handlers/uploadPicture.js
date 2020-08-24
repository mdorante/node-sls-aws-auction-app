export async function uploadPicture(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
}

export const handler = uploadPicture;
