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
        SubscriptionActions.COMMENT_CREATED
      );
    },
  },
  Subscription: {
    createComment: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(SubscriptionActions.COMMENT_CREATED),
        (payload, args) => payload.createComment.node.post == args.postId
      ),
    },
  },
};

export { commentResolver };
