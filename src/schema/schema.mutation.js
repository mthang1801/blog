import { gql } from "apollo-server-express";

const schemaMutation = gql`
  type Mutation {
    createUser(data: CreateUserInput!): UserAuthPayload!
    createPost(data: PostInputCreate!): Post!
    updatePost(postId: ID!, data: PostInputUpdate!): Post!
    deletePost(postId: ID!) : Post! 
    createComment(postId: ID!, data : CreateCommentInput!) : Comment! 
  }
`;

export { schemaMutation };
