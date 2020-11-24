import { pubsub } from "../pubsub";
import { commentController } from "./comment.controller";
import { SubscriptionActions } from "../schema/schema.subscription";
import { withFilter } from "apollo-server-express";
const commentResolver = {
  Mutation: {
    createComment: (root, args, { req }, info) => {
      return commentController.createComment(
        args.postId,
        args.data,
        req,
        pubsub,
        SubscriptionActions.COMMENT_ACTIONS
      );
    },
    updateComment : (root, args, {req}, info) => {
      return commentController.updateComment(        
        args.commentId, 
        args.data, 
        req, 
        pubsub, 
        SubscriptionActions.COMMENT_ACTIONS
      )
    },
    deleteComment : (root, args, {req} , info ) => {
      return commentController.deleteComment(
        args.commentId,
        req, 
        pubsub,
        SubscriptionActions.COMMENT_ACTIONS
      )
    }
  },
  Subscription: {
    commentActions: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(SubscriptionActions.COMMENT_ACTIONS),
        (payload, args) =>{
          console.log(payload)
          return payload.commentActions.node.post._id == args.postId
        }
        
      ),
    },    
  },
};

export { commentResolver };
