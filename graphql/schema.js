const { GraphQLSchema } = require("graphql");
const { RootQueryType } = require("./types");

// This GraphQLSchema 3 ta thakbe query, mutation, subscription
// query and mutation value provided
const schema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = { schema };
// const graphql = require("graphql");
// const User = require("../models/user.model");

// const {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLInt,
//   GraphQLSchema,
//   GraphQLID,
//   GraphQLList,
//   GraphQLNonNull,
// } = graphql;

// // User Type
// const UserType = new GraphQLObjectType({
//   name: "User",
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     age: { type: GraphQLInt },
//     email: { type: GraphQLString },
//   }),
// });

// // Root Query
// const RootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     user: {
//       type: UserType,
//       args: { id: { type: GraphQLID } },
//       resolve(parent, args) {
//         return User.findById(args.id);
//       },
//     },
//     users: {
//       type: new GraphQLList(UserType),
//       resolve(parent, args) {
//         return User.find({});
//       },
//     },
//   },
// });

// // Mutations
// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     addUser: {
//       type: UserType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         age: { type: new GraphQLNonNull(GraphQLInt) },
//         email: { type: new GraphQLNonNull(GraphQLString) },
//       },
//       resolve(parent, args) {
//         let user = new User({
//           name: args.name,
//           age: args.age,
//           email: args.email,
//         });
//         return user.save();
//       },
//     },
//   },
// });

// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: Mutation,
// });
