# 1. Introduction to GraphQL

- ### 1. What is GraphQL?
- ### 2. Why Use GraphQL?
- ### 3. GraphQL vs REST APIs
- ### 4. Over-Fetching and Under-Fetching

# 2. Installation in GraphQL

- ### 1. Installation in GraphQL
- ### 2. Setup and Example

# 3. GraphQL Schema

### 3.1 GraphQL Type System

### 3.2 GraphQL Type Language

### 3.3 Object Types and Fields

### 3.3 Arguments in GraphQL Schema

### 3.4 Query and Mutation Types

### 3.5 Scalar Types

### 3.6 Enumeration Types

### 3.7 Lists and Non-Null

### 3.8 Interfaces

### 3.9 Union Types

### 3.10 Input Types

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

### Side-by-Side Comparison

| Feature            | REST API                      | GraphQL API                   |
| ------------------ | ----------------------------- | ----------------------------- |
| **Endpoint**       | Multiple (`/users`, `/posts`) | Single (`/graphql`)           |
| **Data Fetching**  | Fixed response (all fields)   | Client decides which fields   |
| **Over-fetching**  | Common problem                | Avoided                       |
| **Under-fetching** | Requires multiple requests    | Avoided (nested queries)      |
| **Real-time**      | Limited (requires WebSockets) | Built-in (Subscriptions)      |
| **Caching**        | Easy (HTTP cache)             | More complex (Apollo, custom) |
| **Learning Curve** | Easier                        | Steeper (schema, resolvers)   |

---

### 4. Over-Fetching and Under-Fetching

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

## Simple Example

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

# GraphQL Schema

### 3.1 GraphQL Type System

- GraphQL is a strongly typed language, which means every piece of data in a GraphQL service has a specific type.

- It is a concept in GraphQL which is used to describe the potential of a GraphQL server.

- It helps to define the various data types which are used in a GraphQL application. With the help of Type System, it helps to define the schema, which is a contract between the client and the server.

- It tells us what data type can be queried and what are the operations which can be performed. It also informs us whether a query is valid or not.

- The type system also ensures that queries are valid and provides a clear structure for interacting with the server.

Let's explore the different types in the GraphQL type system

![alt text](/images/dataTypes.png)

### 3.1.1 `Scalar Types`:

`Definition`

Scalar types represent the basic data types in GraphQL. They are the leaves of the query and cannot have subfields.

`Common Scalar Types`

- `GraphQLString- `: Represents textual data.

- `GraphQLInt- `: Represents a 32-bit signed integer.

- `GraphQLFloat- `: Represents a signed double-precision floating-point value.

- `GraphQLBoolean- `: Represents true or false.

- `GraphQLID- `: Represents a unique identifier, often used to refetch an object or as the key for a cache.

```js
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User information",
  fields: () => {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },// id not null
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      height: { type: GraphQLFloat },
    };
  },
```

### 3.1.2 `Object Types`

`Definition:`
Object types define a set of fields that can be queried on that type. They are the most common type in GraphQL schemas.

- `note: What GraphQLObjectType actually is`

1. GraphQLObjectType is a constructor function provided by the graphql library.

2. It is used to define the shape of an object in your GraphQL schema.

```js
const {
  GraphQLObjectType,

  GraphQLString,
  GraphQLInt,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "Post",
  description: "User post related data show here",
  fields: () => {
    return {
      title: { type: GraphQLString },
      content: { type: GraphQLString },
      view: { type: GraphQLInt },
    };
  },
});
```

### 3.1.3 Query Types

`Definition:`

The `Query type` is a special object type that defines all the read operations (i.e., fetching data) in a GraphQL schema.

Example:

```js
const { GraphQLObjectType, GraphQLList } = require("graphql");
const { users } = require("./data");

const UserType = new GraphQLObjectType({
  name: "user",
  description: "User post related data show here",
  fields: () => {
    return {
      title: { type: GraphQLString },
      content: { type: GraphQLString },
      view: { type: GraphQLInt },
    };
  },
});
const RootQueryType = new GraphQLObjectType({
  name: "query",
  description: "Root Query",
  fields: () => {
    return {
      user: {
        type: new GraphQLList(UserType),
        resolve: () => users, // Assume 'users' is an array of user objects. it load data from database
      },
    };
  },
});
module.exports = { RootQueryType };
```

### 3.1.4 Not Null Types

`Definition:`

The GraphQLNonNull type wraps another type and signifies that the field cannot be null.

```js
const { GraphQLNonNull, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});
```

### 3.1.5 Enumeration Types (GraphQLEnumType)

`Definition:`

An Enum type is a field that can only have specific predefined values. It’s like a “restricted set of options” for a field.

`When to use Enum : `

- Use enum when a field should only allow certain values.

- Example use cases:

  - Gender → "male" or "female"

  - Status → "active", "inactive", "pending"

  - Role → "admin", "user", "guest"

Example

```js
const { GraphQLEnumType } = require("graphql");

const GenderEnumType = new GraphQLEnumType({
  name: "gender",
  values: {
    male: { value: "male" },
    female: { value: "female" },
  },
});
```
