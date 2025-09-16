const {
  GraphQLEnumType,
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const { PostType } = require("./post.type");
const { users } = require("../../models/user.model");
const { postResolver } = require("../../resolvers/post.reslover");

// gender enum type
const GenderEnumType = new GraphQLEnumType({
  name: "GenderEnumType",
  description: "Enum type for gender",
  values: {
    male: {
      value: "male",
    },
    female: {
      value: "female",
    },
  },
});
// user type
const UserType = new GraphQLObjectType({
  name: "User",
  description: "It represent a single user",
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      gender: {
        type: GenderEnumType,
      },
      phone: {
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLString,
      },
      posts: {
        type: new GraphQLList(PostType),
        resolve: (parent, args) => {
          return postResolver.getPostByUserId(parent); // find post in user by user id
        },
      },
    };
  },
});

module.exports = { UserType };
