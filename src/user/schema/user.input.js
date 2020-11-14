import { gql } from "apollo-server-express";

const userInput = gql`
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }
  input LoginUserInput {
    email: String!
    password: String!
  }
`;

export { userInput };
