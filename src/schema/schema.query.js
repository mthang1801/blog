import { gql } from "apollo-server-express";

const schemaQuery = gql`
  type Query {
    users: [User!]!
    loginUser(data: LoginUserInput!): UserAuthPayload!
    posts(query: String): [Post!]!
  }
`;

export { schemaQuery };
