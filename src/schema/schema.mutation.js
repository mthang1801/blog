import { gql } from "apollo-server-express";

const schemaMutation = gql`
  type Mutation {
    createUser(data: CreateUserInput!): UserAuthPayload!
    createPost(data: PostInputCreate!): Post!
    updatePost(postId: ID!, data: PostInputUpdate!): Post!
    deletePost(postId: ID!): Post!
    createComment(postId: ID!, data: CommentInput!): Comment!
    updateComment(commentId: ID!, data: CommentInput!): Comment!
    deleteComment(commentId: ID!): Comment
  }
`;

export { schemaMutation };
