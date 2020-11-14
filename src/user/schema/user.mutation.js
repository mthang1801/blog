import { gql } from "apollo-server-express";

const userMutation = gql`
  type Mutation {
    createUser(data: CreateUserInput!): UserAuthPayload!
  }
`;

export { userMutation };
