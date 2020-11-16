import { Post } from "./post.model"
import getAuthUser from "../utils/getAuthUser"
import {CheckResultAndHandleErrors} from "apollo-server-express"
const postController = {
  posts: async query => Post.find({ title: new RegExp(`${query}`, "i"), status: "public" }).populate("author"),
  createPost: async (data, req, pubsub, connectionParam) => {
    const userId = getAuthUser(req);
    const newPost = new Post({
      ...data,
      author: userId
    })
    await (await newPost.save()).populate("author").execPopulate()
    pubsub.publish(connectionParam, {createPost : {
      mutation : "CREATED", 
      node : newPost
    }})
    return newPost
  },
  updatePost : async (postId, data, req, pubsub, connectionParam ) => {
    const {title, content, status} = data ; 
    if(!data){
      throw new CheckResultAndHandleErrors("Data was empty");
    }
    const userId = getAuthUser(req);
    const post = await Post.findById(postId);
    if(!post){
      throw new CheckResultAndHandleErrors("Post not found");
    }
    if(title){
      post.title = title; 
    }
    if(content){
      post.content = content;
    }
    if(status){
      post.status = status ; 
    }
    await post.save();
    pubsub.publish(connectionParam, {
      updatePost : {
        mutation : "UPDATED",
        node : post
      }
    })
    return post;
  }
}

export { postController }