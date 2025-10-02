const { GraphQLScalarType, GraphQLError, Kind } = require("graphql");

const DateType = new GraphQLScalarType({
  name: "DateType",
  description: "It represents a date",
  // Server → Client (how the Date is sent out)
  serialize: (value) => {
    const date = new Date(value);
    if (date.toString() === "Invalid Date") {
      throw new GraphQLError(`${value} is not a valid date`);
    }
    // return date.toISOString();
    return date.toLocaleDateString();
  },
  // Client → Server (when client sends a variable)
  parseValue: (value) => {
    return value;
  },
  parseLiteral: (AST) => {
    if (AST.kind === Kind.STRING || AST.kind === Kind.INT) {
      return AST.value;
    } else {
      throw GraphQLError(`${AST.value} is not a number or string`);
    }
  },
});
module.exports = { DateType };
