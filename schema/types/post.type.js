const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require("graphql");
const { users } = require("../../models/user.model");

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "It represents a single post",
  fields: () => {
    // ✅ Lazy require here to avoid circular dependency
    const { UserType } = require("./user.type");

    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      user: {
        type: UserType,
        resolve: (post) => {
          return users.find((user) => user.id == post.user); // find user by post 
        },
      },
    };
  },
});

module.exports = { PostType };
