import { gql } from "apollo-server-express";

const schemaSubscription = gql`
  type Subscription {
    createPost(userId: ID!): PostSubscriptionPayload
    updatePost(postId: ID!): PostSubscriptionPayload
  }
`;

const SubscriptionActions = {
  POST_CREATED: "POST_CREATED",
  POST_UPDATED: "POST_UPDATED",
};
export { SubscriptionActions };
export { schemaSubscription };
