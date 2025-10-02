const { GraphQLScalarType, GraphQLError, Kind } = require("graphql");

const helper = (password) => {
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/;
  return regex.test(password);
};

const PasswordType = new GraphQLScalarType({
  name: "PasswordType",
  description:
    "A strong password (8-32 chars, uppercase, lowercase, number, special char)",

  serialize() {
    throw new GraphQLError("Password cannot be queried");
  },

  parseValue: (value) => {
    if (!helper(value)) {
      throw new GraphQLError(
        "Password must be 8-32 characters, include uppercase, lowercase, number, and special character"
      );
    }
    return value;
  },
  parseLiteral: (AST) => {
    if (AST.kind !== Kind.STRING || !helper(AST.value)) {
      throw new GraphQLError(
        "Password must be 8-32 characters, include uppercase, lowercase, number, and special character"
      );
    }
    return AST.value;
  },
});
module.exports = { PasswordType };
