const { GraphQLEnumType } = require("graphql");

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
module.exports = { GenderEnumType };
