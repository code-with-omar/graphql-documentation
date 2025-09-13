# GraphQL with Express (`express-graphql`)

## 📌 What is GraphQL?

GraphQL is a **query language** for APIs and a runtime for executing those queries.  
It lets clients request exactly the data they need — nothing more, nothing less.

### 🔹 Why use GraphQL?

- ✅ Fetch only required data (no over-fetching like REST).
- ✅ Single endpoint for all queries and mutations.
- ✅ Strongly typed schema (clear API contract).
- ✅ Works with any database or backend.
- ✅ Great developer tools (GraphiQL, Playground).

---

## 📌 Installation

1. Initialize project:
   ```bash
   mkdir graphql-demo && cd graphql-demo
   npm init -y
   ```
2. Install dependencies:
   ```bash
   npm install express express-graphql graphql
   ```

## 📌 Simple Example

index.js

```js
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// Schema
const schema = buildSchema(`
  type User {
    id: Int
    name: String
    age: Int
  }

  type Query {
    users: [User]
    user(id: Int!): User
  }

  type Mutation {
    addUser(name: String!, age: Int!): User
  }
`);

// Dummy Data
const users = [
  { id: 1, name: "Omar", age: 22 },
  { id: 2, name: "Faruk", age: 25 },
];

// Resolvers
const root = {
  users: () => users,
  user: ({ id }) => users.find((u) => u.id === id),
  addUser: ({ name, age }) => {
    const newUser = { id: users.length + 1, name, age };
    users.push(newUser);
    return newUser;
  },
};

// Express Server
const app = express();
app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));
app.listen(4000, () =>
  console.log("🚀 Server ready at http://localhost:4000/graphql")
);
```

## Example Queries:

```graphql
{
  users {
    id
    name
    age
  }
}

{
  user(id: 1) {
    name
    age
  }
}
```
