const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    // rootValue,
  })
);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000/graphql");
});
