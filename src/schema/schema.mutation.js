import { gql } from "apollo-server-express";

const schemaMutation = gql`
  type Mutation {
    createUser(data: CreateUserInput!): UserAuthPayload!
  }
`;

export { schemaMutation }