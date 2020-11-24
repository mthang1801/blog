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
        SubscriptionActions.POST_ACTIONS
      );
    },
    updatePost: (root, args, { req }, info) => {
      return postController.updatePost(
        args.postId,
        args.data,
        req,
        pubsub,
        SubscriptionActions.POST_ACTIONS
      );
    },
    deletePost : (root, args, {req}, info) => {
      return postController.deletePost(
        args.postId, 
        req,
        pubsub, 
        SubscriptionActions.POST_ACTIONS
      )
    }
  },
  Subscription: {
    postActions: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(SubscriptionActions.POST_ACTIONS),
        (payload, args) => {
          console.log(payload)
          return payload.postActions.node.author._id == args.userId
        }
      )
    },    
  },
};

export { postResolver };
