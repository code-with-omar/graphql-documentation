const { GraphQLScalarType, GraphQLError, Kind } = require("graphql");

// email validation helper
const isEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
const EmailType = new GraphQLScalarType({
  name: "EmailType",
  description: "It represents a email type",

  serialize: (value) => {
    if (typeof value !== "string") {
      throw new GraphQLError("Email must be a string");
    }
    if (!isEmail(value)) {
      throw new GraphQLError(`${value} is not a valid email address`);
    }
    return value.toLowerCase();
  },

  parseValue: (value) => {
    if (typeof value !== "string") {
      throw new GraphQLError("Email must be a string");
    }
    if (!isEmail(value)) {
      throw new GraphQLError(`${value} is not a valid email address`);
    }
    return value.toLowerCase();
  },
  parseLiteral: (AST) => {
    if (AST.kind !== Kind.STRING) {
      throw new GraphQLError("Email must be a string literal");
    }
    if (!isEmail(AST.value)) {
      throw new GraphQLError(`${AST.value} is not a valid email address`);
    }
    return AST.value.toLowerCase();
  },
});
module.exports = { EmailType };
