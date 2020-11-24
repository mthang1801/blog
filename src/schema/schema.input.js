import { gql } from "apollo-server-express";

const schemaInput = gql`
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }
  input LoginUserInput {
    email: String!
    password: String!
  }
  input PostInputCreate {
    title: String!
    content: String!
    status: String
  }
  input PostInputUpdate {
    title: String
    content: String
    status: String
  }
  input CommentInput{
    content : String!
  }
`;

export { schemaInput };
