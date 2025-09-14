# 1. Introduction to GraphQL

- ### 1. What is GraphQL?
- ### 2. Why Use GraphQL?
- ### 3. GraphQL vs REST APIs
- ### 4. Data Fetching with GraphQL
- ### 5. Over-Fetching and Under-Fetching

# 2. Installation in GraphQL

- ### 1. Installation in GraphQL
- ### 2. Setup and Example

# 1. Introduction to GraphQL

### 1. What is GraphQL?

`GraphQL` is an open-source data query language for APIs and It is a server-side runtime for executing the query. The server's `GraphQL` runtime takes care of executing the query and ensuring that the right data is fetched and sent back.

It is an alternative to `REST`, where clients make multiple requests to different endpoints to get the data they require but in `GraphQL` clients can request exactly the data they need in a single query.

It was developed by Facebook and made open source for the whole world.

### 2. Why use GraphQL?

- ✅ Fetch only required data (no over-fetching like REST).
- ✅ Single endpoint for all queries and mutations.
- ✅ Strongly typed schema (clear API contract).
- ✅ Works with any database or backend.
- ✅ Great developer tools (GraphiQL, Playground).

### 3. GraphQL vs REST APIs

`REST API`

- Requires multiple endpoints for different resources.
  Example:

  ```js
  GET /users → Fetch all users

  GET /users/:id → Fetch single user

  POST /users → Create new user
  ```

- Can suffer from over-fetching (extra data returned) or under-fetching (not enough data, need multiple requests).

- Simple and widely adopted standard (developers are very familiar).

- Easy to use with built-in HTTP caching.

`GraphQL API`

- Uses a single endpoint → /graphql

- Client specifies exactly which fields are needed.

Example:

```js
  {
    users {
      id
     name
    }
  }
```

- Returns only id and name, nothing extra.

- Uses Queries for reading and Mutations for create/update/delete.

- Supports real-time updates with Subscriptions.

- Strongly typed schema defines the contract between frontend and backend.

# Installation in GraphQL

`Installation`

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
