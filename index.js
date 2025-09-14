const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./graphql/schema");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/graphql_demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enables GraphiQL UI at /graphql
  })
);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000/graphql");
});
