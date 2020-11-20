import { Post } from "./post.model";
import { User } from "../user/user.model";
import getAuthUser from "../utils/getAuthUser";
import { CheckResultAndHandleErrors, ValidationError } from "apollo-server-express";
// import mongoose to use transaction 
import mongoose  from "mongoose";
const postController = {
  posts: async (query) => {
    if (query) {
      return Post.find({
        title: new RegExp(`${query}`, "i"),
        status: "public",
      }).populate("author");
    }
    return Post.find({ status: "public" }).populate("author");
  },
  createPost: async (data, req, pubsub, connectionParam) => {
    const userId = getAuthUser(req);    
    const newPost = new Post({
      ...data,
      author: userId,
    });
    const session = await mongoose.startSession();
    session.startTransaction()
    await (await newPost.save()).populate("author").execPopulate();
    // add post into post list of user
    const user = await User.findById(userId); 
    if(!user){
      throw new ValidationError("User not found");
    }
    user.posts.push(newPost._id);
    await user.save();
    await session.commitTransaction()    
    pubsub.publish(connectionParam, {
      createPost: {
        mutation: "CREATED",
        node: newPost,
      },
    });
    session.endSession();
    return newPost;
  },
  updatePost: async (postId, data, req, pubsub, connectionParam) => {
    const { title, content, status } = data;
    if (!data) {
      throw new CheckResultAndHandleErrors("Data was empty");
    }
    const userId = getAuthUser(req);
    const post = await Post.findById(postId);
    if (!post) {
      throw new CheckResultAndHandleErrors("Post not found");
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    if (status) {
      post.status = status;
    }
    await post.save();
    pubsub.publish(connectionParam, {
      updatePost: {
        mutation: "UPDATED",
        node: post,
      },
    });
    return post;
  },
  deletePost: async (postId, req, pubsub, connectionParam) => {
    const userId = getAuthUser(req);
    const post = await Post.findByIdAndRemove({
      _id: postId,
      author: userId,
    }).populate("author");
    if (!post) {
      throw new CheckResultAndHandleErrors("Delete fail, post not found");
    }
   
    pubsub.publish(connectionParam, {
      deletePost: {
        mutation: "DELETED",
        node: post,
      },
    });    
    return post;
  },
};

export { postController };
