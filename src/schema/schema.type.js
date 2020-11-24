import { gql } from "apollo-server-express";

const schemaType = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    posts: [Post!]!
    comments:  [Comment!]!
    createdAt: String
    updatedAt: String
  }
  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
    status: String!
    comments : [Comment!]! 
    createdAt: String!
    updatedAt: String
  }
  type Comment {
    _id : ID! 
    content : String!
    author : User! 
    post : Post!
    createdAt : String! 
    updatedAt : String! 
  }
  type UserAuthPayload {
    user: User!
    token: String!
  }
  type PostSubscriptionPayload {
    mutation: MutationType!
    node: Post!
  }
  type CommentSubscriptionPayload {
    mutation: MutationType!
    node: Comment!
  }  
`;

export { schemaType };
