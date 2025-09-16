const { GraphQLList, GraphQLNonNull, GraphQLID } = require("graphql");
const { PostType } = require("../types/post.type");
const { postResolver } = require("../../resolvers/post.reslover");

const postQueries = {
  posts: {
    type: GraphQLList(new GraphQLNonNull(PostType)),
    resolve: () => {
      return postResolver.getPosts();
    },
  },
  post: {
    type: PostType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: (parent, args) => {
      return postResolver.getPostById(args.id);
    },
  },
};
module.exports = { postQueries };
