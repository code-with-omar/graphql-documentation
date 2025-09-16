const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require("graphql");
const { UserType } = require("./user.type");
const { users } = require("../../models/user.model");

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "user related post",
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      title: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
      user: {
        type: UserType,
        resolve: (post, _) => {
          return users.find((user) => user.id == post.user);
        },
      },
    };
  },
});
module.exports = { PostType };
