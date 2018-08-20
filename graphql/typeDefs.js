const typeDefinitions = `
type User {
  id: ID!
  username: String
  email: String
  todos: [Todo]
  createdAt: String
  updatedAt: String
}

input UserInput {
  username: String
  email: String
  password: String
}

type Todo {
  id: ID!
  userId: ID!
  action: String
  createdAt: String
  updatedAt: String
}

input TodoInput {
  action: String
  userId: ID!
}

# The schema allows the following queries:
type RootQuery {
  user(id: ID): User
  users: [User]
  todo(id: ID!): Todo
  todos: [Todo]
}

# The schema allows the following mutations:
type RootMutation {
  createUser(input: UserInput!): User
  updateUser(id: ID!, input: UserInput!): User
  removeUser(id: ID!): User
  createTodo(input: TodoInput!): Todo
  updateTodo(id: ID!, input: TodoInput!): Todo
  removeTodo(id: ID!): Todo
}

# We need to tell the server which types represent the root query.
# We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`;

module.exports = typeDefinitions;
