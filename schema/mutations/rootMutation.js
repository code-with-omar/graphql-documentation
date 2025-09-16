const { GraphQLObjectType } = require("graphql");
const { userMutation } = require("./user.mutation");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    ...userMutation,
  }),
});
module.exports = { RootMutationType };
