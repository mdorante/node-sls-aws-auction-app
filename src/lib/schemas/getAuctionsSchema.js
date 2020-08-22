const schema = {
  properties: {
    queryStringParameters: {
      type: "object",
      properties: {
        type: "string",
        enum: ["OPEN", "CLOSED"],
        default: "OPEN",
      },
    },
  },
  required: ["queryStringParameters"],
};

export default schema;
