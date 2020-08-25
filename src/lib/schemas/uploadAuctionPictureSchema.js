const schema = {
  properties: {
    body: {
      type: "string",
      minLength: 1,
      pattern: "[A-Za-z0-9+/=]=$",
    },
  },
  required: ["body"],
};

export default schema;
