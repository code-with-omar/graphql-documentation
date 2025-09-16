const { GraphQLNonNull } = require("graphql");
const { UserType } = require("../types/user.type");

const { userResolver } = require("../../resolvers/user.resolver");
const { userInputType } = require("../types/userInput.type");
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
};
module.exports = { userMutation };
