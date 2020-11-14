import { gql } from "apollo-server-express";

const userQuery = gql`
  type Query {
    users: [User!]!
    loginUser(data: LoginUserInput!): UserAuthPayload!
  }
`;

export { userQuery };
