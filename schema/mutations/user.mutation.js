const { GraphQLNonNull, GraphQLID, GraphQLBoolean } = require("graphql");
const { UserType } = require("../types/user.type");

const { userResolver } = require("../../resolvers/user.resolver");
const { userInputType } = require("../types/userInput.type");
const { updateUserInputType } = require("../types/userUpdate.type");

const userMutation = {
  addUser: {
    type: UserType,
    args: {
      input: {
        type: new GraphQLNonNull(userInputType),
      },
    },
    resolve: (_, args) => {
      return userResolver.uploadUser(args.input);
    },
  },
  updateUser: {
    type: UserType,
    args: {
      id: {
        type: GraphQLID,
      },
      input: {
        type: updateUserInputType,
      },
    },
    resolve: (_, args) => {
      return userResolver.updateUser(args.id, args.input);
    },
  },
  deleteUser: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      id: {
        type: GraphQLID,
      },
    },
    resolve: (_, args) => {
      return userResolver.deleteUser(args.id);
    },
  },
};
module.exports = { userMutation };
