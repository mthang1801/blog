import { gql } from "apollo-server-express";

const schemaType = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    posts: [Post!]!
    createdAt: String
    updatedAt: String
  }
  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
    status: String!
    createdAt: String!
    updatedAt: String
  }
  type UserAuthPayload {
    user: User!
    token: String!
  }
  type PostSubscriptionPayload {
    mutation: MutationType!
    node: Post!
  }
`;

export { schemaType };
