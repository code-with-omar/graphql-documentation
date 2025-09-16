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

### 3.2 Object Types and Fields

### 3.3 Arguments in GraphQL Schema

### 3.4 Query and Mutation Types

### 3.5 Scalar Types

### 3.6 Enumeration Types

### 3.7 Lists and Non-Null

### 3.8 Interfaces

### 3.9 Union Types

### 3.10 Input Types

# GraphQL Data Fetching in real time

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

### 3.1.6 List Types (GraphQLList)

`Definition :`

GraphQLList represents a list (array) of values of a particular type. You can use it with scalar types, object types, enum types, etc.

`Analogy:`

- If a single value = apple

- Then GraphQLList(GraphQLString) = [apple, banana, orange]

`Why we use GraphQLList`

- To return multiple items from a query.

- To represent arrays in your data.

- To enforce type checking on every element of the list.

Example

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

### 3.2 Object Types and Fields

`Definition: Object Types`
Object types define a `set of fields` that can be queried on that type. They are the most common type in GraphQL schemas.

- `note: What GraphQLObjectType actually is`

1. GraphQLObjectType is a constructor function provided by the graphql library.

2. It is used to define the shape of an object in your GraphQL schema.

`What are Fields?: Definition`

- Fields are the properties inside an object type.

- Each field must define:
  1. A name (id, firstName, etc.)
  2. A type (e.g., GraphQLString, GraphQLInt, another object type, or a list)
  3. (Optional) A resolver function if data needs custom fetching

Example

```js
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const students = [
  {
    id: "1",
    name: "Md. Omar Faruk",
    rollnumber: "190605",
    address: "pabna",
  },
  {
    id: "2",
    name: "Sagor",
    rollnumber: "190621",
    address: "pabna",
  },
];

// 1. Define an object type called student

const StudentType = new GraphQLObjectType({
  name: "Student",
  description: "This represents a student",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: GraphQLString,
    },
    rollnumber: {
      type: GraphQLString,
    },
    address: {
      type: GraphQLString,
    },
  }),
});

// 2. Define Root Query (object type) with fields for fetching students

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query for student",
  fields: () => ({
    students: {
      type: new GraphQLList(StudentType),
      description: "List of all students",
      resolve: () => students,
    },
    student: {
      type: StudentType,
      description: "Get student by ID",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (parent, args) => students.find(s.id === args.id),
    },
  }),
});

// 3. Export schema
const schema = new GraphQLSchema({
  query: RootQueryType,
});
module.exports = schema;
```

How It Matches the Concepts

| Concept from Article     | Example in JS Code Above                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| **Object Type**          | `StudentType` defined with `GraphQLObjectType({ name: "Student", fields: { ... } })`                   |
| **Fields**               | Inside `fields: () => ({ id, name, rollNumber, address })` – each field has name + type.               |
| **Scalar types**         | `GraphQLString`, `GraphQLID` are scalar types used for these fields.                                   |
| **Non-null (`!`)**       | `new GraphQLNonNull(GraphQLID)` and `GraphQLNonNull(GraphQLString)` enforce non-nullable fields.       |
| **List of object types** | `students` field on the `Query` returns `new GraphQLList(StudentType)` → array of StudentType objects. |
| **Object types nested**  | `student` field returns a single `StudentType` object via resolver.                                    |

### 3.3 Arguments in GraphQL Schema

`What are Arguments in GraphQL?`

- In GraphQL, `arguments` let you pass values into fields.
- They work like function `parameters`.
- `Arguments` are defined in the schema (with a type) and then used inside resolvers.

Example in JS (with graphql)

1. Dummy Data

```js
const users = [
  { id: "1", name: "Alice", age: 22 },
  { id: "2", name: "Bob", age: 25 },
  { id: "3", name: "Charlie", age: 30 },
];
```

2. Define User Type

```js
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = require("graphql");

// User type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});
```

3. Root Query with Arguments

```js
const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => users,
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, // 👈 Argument defined here
      },
      resolve: (parent, args) => {
        return users.find((user) => user.id === args.id); // use args in resolver
      },
    },
    usersByAge: {
      type: new GraphQLList(UserType),
      args: {
        minAge: { type: GraphQLInt }, // 👈 Argument defined here
        maxAge: { type: GraphQLInt }, // 👈 Argument defined here
      },
      resolve: (parent, args) => {
        return users.filter(
          (user) =>
            (!args.minAge || user.age >= args.minAge) &&
            (!args.maxAge || user.age <= args.maxAge) // use args in resolver
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
```

How to Query with Arguments (GraphiQL Example)

Get single user by ID:

```cmd
query {
  user(id: "2") {
    id
    name
    age
  }
}
```

Get users by age range:

```cmd
query {
  usersByAge(minAge: 23, maxAge: 30) {
    id
    name
    age
  }
}

```

# GraphQL realtime data fetching (Here we used mvc)

```cmd
project/
├── controllers here `resolver`
│ └── user.controller.js # like resolvers → business logic
├── models/
│ └── user.model.js # mongoose or in-memory users
├── schema/
│ ├── queries/
│ │ └── user.query.js # query definitions
│ ├── mutations/
│ │ └── user.mutation.js # mutation definitions
│ ├── types/
│ │ └── user.type.js # GraphQLObjectType for User
│ └── schema.js or index.js # combine Query + Mutation → Schema
├── server.js

```

### `server.js/ index.js` here create server

```js
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
```

### `Models`

models/user.model.js

```js
const users = [
  {
    id: 1,
    firstName: "Omar",
    lastName: "Faruk",
    gender: "male",
    phone: "01831342230",
    email: "omarfaruk65142@gmail.com",
  },
  {
    id: 2,
    firstName: "Shrabony",
    lastName: "Akter",
    gender: "female",
    phone: "01711223344",
    email: "shrabony@example.com",
  },
  {
    id: 3,
    firstName: "Rahim",
    lastName: "Uddin",
    gender: "male",
    phone: "01811111111",
    email: "rahim.uddin@example.com",
  },
  {
    id: 4,
    firstName: "Karima",
    lastName: "Begum",
    gender: "female",
    phone: "01722222222",
    email: "karima.begum@example.com",
  },
  {
    id: 5,
    firstName: "Sabbir",
    lastName: "Hasan",
    gender: "male",
    phone: "01833333333",
    email: "sabbir.hasan@example.com",
  },
];
module.exports = { users };
```

models/post.model.js

```js
const posts = [
  {
    id: 1,
    title: "GraphQL schema",
    description:
      "Introduction to building GraphQL schema with types and resolvers.",
    user: 1,
  },
  {
    id: 2,
    title: "React Basics",
    description: "Understanding components, props, and state in React.",
    user: 2,
  },
  {
    id: 3,
    title: "Node.js Server",
    description: "Setting up a simple Express server for APIs.",
    user: 3,
  },
  {
    id: 4,
    title: "MongoDB Models",
    description:
      "Defining schema and models in Mongoose for database operations.",
    user: 4,
  },
  {
    id: 5,
    title: "Authentication",
    description: "How to implement login and signup with JWT.",
    user: 5,
  },
];

module.exports = { posts };
```

### `Resolver`-> user.resolver.js, post.resolver.js

`user.resolver.js`

```js
const { users } = require("../models/user.model");

const userResolver = {
  getUsers: () => {
    return users;
  },
  getUserById: (id) => users.find((user) => user.id == id),
};
module.exports = { userResolver };
```

`post.resolver.js`

```js
const { posts } = require("../models/post.model");

const postResolver = {
  getPosts: () => {
    return posts;
  },
  getPostById: (id) => {
    return posts.find((post) => post.id == id);
  },
};
module.exports = { postResolver };
```

### Schema

1. `schema.js`

```js
const { GraphQLSchema } = require("graphql");
const { RootQueryType } = require("./rootQueries");

const schema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = { schema };
```

2. `rootQueries.js`

```js
const { GraphQLObjectType } = require("graphql");
const { userQueries } = require("./queries/user.query");
const { postQueries } = require("./queries/post.query");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    ...userQueries,
    ...postQueries, // ✅ spread all queries as fields of Query
  }),
});
module.exports = { RootQueryType };
```

3. `queries`-> queries/user.query.js, queries/post.query.js

`queries/user.query.js`

```js
const { GraphQLList, GraphQLNonNull, GraphQLID } = require("graphql");
const { userResolver } = require("../../resolvers/user.resolver");
const { UserType } = require("../types/user.type");

const userQueries = {
  users: {
    type: new GraphQLList(new GraphQLNonNull(UserType)),
    resolve: () => {
      return userResolver.getUsers(); // here data fetching in database
    },
  },
  user: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }, // ✅ define argument
    },
    resolve: (parent, args) => {
      return userResolver.getUserById(args.id); // ✅ correct usage
    },
  },
};
module.exports = { userQueries };
```

`queries/post.query.js`

```js
const { GraphQLList, GraphQLNonNull, GraphQLID } = require("graphql");
const { PostType } = require("../types/post.type");
const { postResolver } = require("../../resolvers/post.reslover");

const postQueries = {
  posts: {
    type: GraphQLList(new GraphQLNonNull(PostType)),
    resolve: () => {
      return postResolver.getPosts();
    },
  },
  post: {
    type: PostType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: (parent, args) => {
      return postResolver.getPostById(args.id);
    },
  },
};
module.exports = { postQueries };
```

4. `Types` -> user.type.js, post.type.js

`user.type.js`

```js
const {
  GraphQLEnumType,
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

// gender enum type
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
// user type
const UserType = new GraphQLObjectType({
  name: "User",
  description: "It represent a single user",
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
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

module.exports = { UserType };
```

`post.type.js`

```js
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require("graphql");
const { UserType } = require("./user.type");
const { users } = require("../../models/user.model");

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "user related post",
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      title: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
      user: {
        type: UserType,
        resolve: (post, _) => {
          return users.find((user) => user.id == post.user); // here load user "Relationship Between Two Different Types"
        },
      },
    };
  },
});
module.exports = { PostType };
```

After Relationship Between Two Different Types output

```cmd
{
  posts {
	id
  title
  description
  user{
    id,
    lastName
  }
  }
}
// by id

{
  post(id:"1") {
	id
  title
  description
  user{
    id,
    lastName
  }
  }
}
```

# Another use case query and mutation

## Query and Nested Query:`Relationship Between Two Different Types Nested query`

### `Server: index.js`

```js
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
```

### Models

`models/user.model.js`

```js
const users = [
  {
    id: 1,
    firstName: "Omar",
    lastName: "Faruk",
    gender: "male",
    phone: "01831342230",
    email: "omarfaruk65142@gmail.com",
    posts: [1, 2, 4],
  },
  {
    id: 2,
    firstName: "Shrabony",
    lastName: "Akter",
    gender: "female",
    phone: "01711223344",
    email: "shrabony@example.com",
    posts: [3, 5],
  },
  {
    id: 3,
    firstName: "Rahim",
    lastName: "Uddin",
    gender: "male",
    phone: "01811111111",
    email: "rahim.uddin@example.com",
    posts: [7],
  },
  {
    id: 4,
    firstName: "Karima",
    lastName: "Begum",
    gender: "female",
    phone: "01722222222",
    email: "karima.begum@example.com",
    posts: [6],
  },
  {
    id: 5,
    firstName: "Sabbir",
    lastName: "Hasan",
    gender: "male",
    phone: "01833333333",
    email: "sabbir.hasan@example.com",
    posts: [8, 9],
  },
  {
    id: 6,
    firstName: "Nusrat",
    lastName: "Jahan",
    gender: "female",
    phone: "01744444444",
    email: "nusrat.jahan@example.com",
    posts: [10],
  },
  {
    id: 7,
    firstName: "Mahmud",
    lastName: "Khan",
    gender: "male",
    phone: "01855555555",
    email: "mahmud.khan@example.com",
    posts: [15],
  },
  {
    id: 8,
    firstName: "Salma",
    lastName: "Khatun",
    gender: "female",
    phone: "01766666666",
    email: "salma.khatun@example.com",
    posts: [12, 14],
  },
  {
    id: 9,
    firstName: "Rashed",
    lastName: "Ali",
    gender: "male",
    phone: "01877777777",
    email: "rashed.ali@example.com",
    posts: [13],
  },
  {
    id: 10,
    firstName: "Mitu",
    lastName: "Rahman",
    gender: "female",
    phone: "01788888888",
    email: "mitu.rahman@example.com",
    posts: [11],
  },
];
module.exports = { users };
```

`models/post.model.js`

```js
const posts = [
  {
    id: 1,
    title: "GraphQL schema",
    description:
      "Introduction to building GraphQL schema with types and resolvers.",
    user: 1,
  },
  {
    id: 2,
    title: "React Basics",
    description: "Understanding components, props, and state in React.",
    user: 1,
  },
  {
    id: 3,
    title: "Node.js Server",
    description: "Setting up a simple Express server for APIs.",
    user: 2,
  },
  {
    id: 4,
    title: "MongoDB Models",
    description:
      "Defining schema and models in Mongoose for database operations.",
    user: 1,
  },
  {
    id: 5,
    title: "Authentication",
    description: "How to implement login and signup with JWT.",
    user: 2,
  },
  {
    id: 6,
    title: "Authorization",
    description: "Role-based access control in REST and GraphQL APIs.",
    user: 4,
  },
  {
    id: 7,
    title: "Frontend Deployment",
    description: "Deploying React apps to Vercel and Netlify.",
    user: 3,
  },
  {
    id: 8,
    title: "Backend Deployment",
    description: "Hosting Node.js applications on Render and Railway.",
    user: 5,
  },
  {
    id: 9,
    title: "GraphQL Queries",
    description: "How to fetch data using queries in GraphQL.",
    user: 5,
  },
  {
    id: 10,
    title: "GraphQL Mutations",
    description: "Updating data in the backend with mutations.",
    user: 6,
  },
  {
    id: 11,
    title: "GraphQL Subscriptions",
    description: "Real-time data with subscriptions in GraphQL.",
    user: 10,
  },
  {
    id: 12,
    title: "React Hooks",
    description: "Using useState, useEffect, and custom hooks.",
    user: 8,
  },
  {
    id: 13,
    title: "Redux Toolkit",
    description: "State management using Redux Toolkit in React.",
    user: 9,
  },
  {
    id: 14,
    title: "Tailwind CSS",
    description: "Styling React components with Tailwind CSS utility classes.",
    user: 8,
  },
  {
    id: 15,
    title: "Next.js API Routes",
    description: "Creating backend API endpoints inside Next.js.",
    user: 7,
  },
];
module.exports = { posts };
```

### Resolver

`/resolver/user.resolver.js`

```js
const { users } = require("../models/user.model");

const userResolver = {
  getUsers: () => {
    return users;
  },
  getUserById: (id) => users.find((user) => user.id == id),
};
module.exports = { userResolver };
```

`resolver/post.resolver`

```js
const { posts } = require("../models/post.model");

const postResolver = {
  getPosts: () => {
    return posts;
  },
  getPostById: (id) => {
    return posts.find((post) => post.id == id);
  },
  getPostByUserId: (parent) => {
    // parent.posts contains array of post IDs
    return posts.filter((post) => parent.posts.includes(post.id)); // find user post by user id
  },
};
module.exports = { postResolver };
```

### Schema

`schema/queries/user.query.js`

```js
const { GraphQLList, GraphQLNonNull, GraphQLID } = require("graphql");
const { userResolver } = require("../../resolvers/user.resolver");
const { UserType } = require("../types/user.type");

const userQueries = {
  users: {
    type: new GraphQLList(new GraphQLNonNull(UserType)),
    resolve: () => {
      return userResolver.getUsers(); // here data fetching in database
    },
  },
  user: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }, // ✅ define argument
    },
    resolve: (parent, args) => {
      return userResolver.getUserById(args.id); // ✅ correct usage
    },
  },
};
module.exports = { userQueries };
```

`schema/queries/post.query.js`

```js
const { GraphQLList, GraphQLNonNull, GraphQLID } = require("graphql");
const { PostType } = require("../types/post.type");
const { postResolver } = require("../../resolvers/post.reslover");

const postQueries = {
  posts: {
    type: GraphQLList(new GraphQLNonNull(PostType)),
    resolve: () => {
      return postResolver.getPosts();
    },
  },
  post: {
    type: PostType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: (parent, args) => {
      return postResolver.getPostById(args.id);
    },
  },
};
module.exports = { postQueries };
```

`schema/types/user.type.js`

```js
const {
  GraphQLEnumType,
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const { PostType } = require("./post.type");
const { users } = require("../../models/user.model");
const { postResolver } = require("../../resolvers/post.reslover");

// gender enum type
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
// user type
const UserType = new GraphQLObjectType({
  name: "User",
  description: "It represent a single user",
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
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
      posts: {
        type: new GraphQLList(PostType),
        resolve: (parent, args) => {
          return postResolver.getPostByUserId(parent); // find post in user by user id
        },
      },
    };
  },
});

module.exports = { UserType };
```

`schema/types/post.type.js`

```js
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require("graphql");
const { users } = require("../../models/user.model");

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "It represents a single post",
  fields: () => {
    // ✅ Lazy require here to avoid circular dependency
    const { UserType } = require("./user.type");

    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      user: {
        type: UserType,
        resolve: (post) => {
          return users.find((user) => user.id == post.user); // find user by post
        },
      },
    };
  },
});

module.exports = { PostType };
```

`schema/schema.js`

```js
const { GraphQLSchema } = require("graphql");
const { RootQueryType } = require("./rootQueries");

const schema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = { schema };
```

`schema/rootQueries.js`

```js
const { GraphQLObjectType } = require("graphql");
const { userQueries } = require("./queries/user.query");
const { postQueries } = require("./queries/post.query");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    ...userQueries,
    ...postQueries, // ✅ spread all queries as fields of Query
  }),
});
module.exports = { RootQueryType };
```

### Output:

```cmd
{
  users {
    firstName,
    lastName,
    posts {
      id
      title
      description
    }
  }
}
another
{

    posts {
      id
      title
      description
    }

}
// another
{

    posts {
      id
      title
      description
      user{
        id
        firstName
        lastName
        email

      }
    }

}
more....

```

## Mutation (Here you used all procedure about above data) -> server,models are same

### Resolvers

`user.resolver.js`

```js
const { users } = require("../models/user.model");
// getusers, and getUserById for query
const userResolver = {
  getUsers: () => {
    return users;
  },
  getUserById: (id) => users.find((user) => user.id == id),
  // uploadUser For modulation
  uploadUser: (input) => {
    const { firstName, lastName, gender, phone, email, posts } = input;
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      gender,
      phone,
      email,
      posts: [],
    };

    users.push(newUser);
    return newUser;
  },
};
module.exports = { userResolver };
```

### Schema

`schema.js`

```js
const { GraphQLSchema } = require("graphql");
const { RootQueryType } = require("./queries/rootQueries");
const { RootMutationType } = require("./mutations/rootMutation");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = { schema };
```

`schema/mutations/rootMutation.js`

```js
const { GraphQLObjectType } = require("graphql");
const { userMutation } = require("./user.mutation");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    ...userMutation,
  }),
});
module.exports = { RootMutationType };
```

`schema/mutations/user.mutation.js`

```js
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
```

`schema/types/userInput.type`

```js
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
```
