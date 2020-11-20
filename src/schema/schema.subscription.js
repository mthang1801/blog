import { gql } from "apollo-server-express";

const schemaSubscription = gql`
  type Subscription {
    createPost(userId: ID!): PostSubscriptionPayload
    updatePost(postId: ID!): PostSubscriptionPayload
    deletePost(postId: ID!): PostSubscriptionPayload
    createComment(postId: ID!) : CommentSubscriptionPayload
  }
`;

const SubscriptionActions = {
  POST_CREATED: "POST_CREATED",
  POST_UPDATED: "POST_UPDATED",
  POST_DELETED: "POST_DELETED",
  COMMENT_CREATED : "COMMENT_CREATED"
};
export { SubscriptionActions };
export { schemaSubscription };
