const { GraphQLSchema } = require("graphql");
const { RootQueryType } = require("./queries/rootQueries");
const { RootMutationType } = require("./mutations/rootMutation");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = { schema };
