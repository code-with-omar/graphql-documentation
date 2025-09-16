const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");
const { GenderEnumType } = require("../enums/gender.enum");

const userInputType = new GraphQLInputObjectType({
  name: "UserInputType",
  description: "Taking input to add a new user",
  fields: () => {
    return {
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
    };
  },
});
module.exports = { userInputType };
