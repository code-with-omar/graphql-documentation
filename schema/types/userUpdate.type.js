const { GraphQLInputObjectType, GraphQLString } = require("graphql");
const { GenderEnumType } = require("../enums/gender.enum");
const { DateType } = require("./custom-type/date.type");
const { EmailType } = require("./custom-type/email.type");

const updateUserInputType = new GraphQLInputObjectType({
  name: "updateUserInputType",
  description: "Update a user by specific field",
  fields: () => {
    return {
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      gender: {
        type: GenderEnumType,
      },
      phone: {
        type: GraphQLString,
      },
      email: {
        type: EmailType,
      },
      createdAt: {
        type: DateType,
      },
    };
  },
});
module.exports = { updateUserInputType };
