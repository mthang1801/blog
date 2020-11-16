import { gql } from "apollo-server-express";

const schemaMutation = gql`
  type Mutation {
    createUser(data: CreateUserInput!): UserAuthPayload!
    createPost(data: PostInputCreate!): Post!
    updatePost(postId: ID!, data: PostInputUpdate!): Post!
  }
`;

export { schemaMutation };
