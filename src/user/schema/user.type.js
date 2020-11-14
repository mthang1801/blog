import { gql } from "apollo-server-express";

const userType = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
  type UserAuthPayload {
    user: User!
    token: String!
  }
`;
export { userType };
