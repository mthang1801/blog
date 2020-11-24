import { gql } from "apollo-server-express";

const schemaSubscription = gql`
  type Subscription {
    postActions(userId: ID!): PostSubscriptionPayload   
    commentActions(postId: ID!): CommentSubscriptionPayload    
  }
`;

const SubscriptionActions = {
  POST_ACTIONS: "POST_ACTIONS",
  COMMENT_ACTIONS : "COMMENT_ACTIONS",  
};
export { SubscriptionActions };
export { schemaSubscription };
