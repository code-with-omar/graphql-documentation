const { GraphQLList, GraphQLNonNull, GraphQLID } = require("graphql");
const { userResolver } = require("../../resolvers/user.resolver");
const { UserType } = require("../types/user.type");

const userQueries = {
  users: {
    type: new GraphQLList(new GraphQLNonNull(UserType)),
    resolve: () => {
      return userResolver.getUsers(); // here data fetching in database
    },
  },
  user: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }, // ✅ define argument
    },
    resolve: (parent, args) => {
      return userResolver.getUserById(args.id); // ✅ correct usage
    },
  },
};
module.exports = { userQueries };
