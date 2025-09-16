const { GraphQLObjectType } = require("graphql");
const { userQueries } = require("./queries/user.query");
const { postQueries } = require("./queries/post.query");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    ...userQueries,
    ...postQueries, // ✅ spread all queries as fields of Query
  }),
});
module.exports = { RootQueryType };
