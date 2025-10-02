const {
  GraphQLEnumType,
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const { PostType } = require("./post.type");
const { postResolver } = require("../../resolvers/post.reslover");
const { GenderEnumType } = require("../enums/gender.enum");
const { DateType } = require("./custom-type/date.type");
const { EmailType } = require("./custom-type/email.type");

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
        type: EmailType,
      },
      createdAt: {
        type: DateType,
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
