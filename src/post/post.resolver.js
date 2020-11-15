import { postController } from "./post.controller";
const postResolver = {
  Query: {
    posts: (root, args, ctx, info) => {
      return postController.posts(args.query);
    },
  },
};

export { postResolver };
