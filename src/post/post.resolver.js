import { postController } from "./post.controller";
import { SubscriptionActions } from "../schema/schema.subscription";
import { withFilter } from "apollo-server-express";
import { pubsub } from "../pubsub";

const postResolver = {
  Query: {
    posts: (root, args, ctx, info) => {
      return postController.posts(args.query);
    },
  },
  Mutation: {
    createPost: (root, args, { req }, info) => {
      return postController.createPost(
        args.data,
        req,
        pubsub,
        SubscriptionActions.POST_CREATED
      );
    },
    updatePost: (root, args, { req }, info) => {
      return postController.updatePost(
        args.postId,
        args.data,
        req,
        pubsub,
        SubscriptionActions.POST_UPDATED
      );
    },
  },
  Subscription: {
    createPost: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(SubscriptionActions.POST_CREATED),
        (payload, args) => payload.createPost.node.author._id == args.userId
      )
    },
    updatePost: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(SubscriptionActions.POST_UPDATED),
        (payload, args) => payload.updatePost.node._id == args.postId
      ),
    },
  },
};

export { postResolver };
