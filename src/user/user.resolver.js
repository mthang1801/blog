import { userController } from "./user.controller";
const userResolver = {
  Query: {
    users: (root, args, ctx, info) => {
      return userController.users(root, args.user);
    },
    loginUser : (root, args, ctx, info) => {
      return userController.loginUser(args.data);
    }
  },
  Mutation: {
    createUser : (root ,args, ctx, info) => {            
      return userController.findOrCreateUser(args.data)
    }
  }
};

export { userResolver };
