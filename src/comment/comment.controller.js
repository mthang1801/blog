import {Comment} from "./comment.model"
import mongoose from "mongoose"; 
import getAuthUser from "../utils/getAuthUser"
import {Post} from "../post/post.model";
import {User} from "../user/user.model"
import {CheckResultAndHandleErrors} from "apollo-server-express"
const commentController = {
  createComment : async (postId, data, req, pubsub, connectParam ) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const userId = getAuthUser(req);
    const post = await Post.findOne({_id : postId, status : "public"});
    if(!post){
      throw  new CheckResultAndHandleErrors("Unable to comment to the post");
    }
    const newComment = new Comment({
      ...data,
      author : userId, 
      post : postId
    })
    await newComment.save();

    //save into user and post model
    const user = await User.findById(userId)
    user.comments.push(newComment._id);
    await user.save();
    post.comments.push(newComment._id)
    await post.save();
    await session.commitTransaction()
    pubsub.publish(connectParam, {
      createComment : {
        mutation : "CREATED", 
        node : newComment
      }
    })
    session.endSession()
    return newComment
  }
};

export { commentController };
