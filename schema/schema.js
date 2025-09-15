const { GraphQLSchema } = require("graphql");
const { RootQueryType } = require("./rootQueries");

const schema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = { schema };
