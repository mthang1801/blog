import { Comment } from "./comment.model";
import mongoose from "mongoose";
import getAuthUser from "../utils/getAuthUser";
import { Post } from "../post/post.model";
import { User } from "../user/user.model";
import {
  CheckResultAndHandleErrors,
  ForbiddenError,
} from "apollo-server-express";
const commentController = {
  createComment: async (postId, data, req, pubsub, connectParam) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const userId = getAuthUser(req);
    const post = await Post.findOne({ _id: postId, status: "public" });
    if (!post) {
      throw new CheckResultAndHandleErrors("Unable to comment to the post");
    }
    const newComment = new Comment({
      ...data,
      author: userId,
      post: postId,
    });
    await (await newComment.save())
      .populate("author")
      .populate("post")
      .execPopulate();

    //save into user and post model
    const user = await User.findById(userId);
    user.comments.push(newComment._id);
    await user.save();
    post.comments.push(newComment._id);
    await post.save();
    await session.commitTransaction();
    pubsub.publish(connectParam, {
      commentActions: {
        mutation: "CREATED",
        node: newComment,
      },
    });
    session.endSession();
    return newComment;
  },
  updateComment: async (   
    commentId,
    data,
    req,
    pubsub,
    connectionParam
  ) => {
    const userId = getAuthUser(req);
    const comment = await Comment.findById(commentId)
      .populate("author")
      .populate("post");
    if (!comment) {
      throw new ForbiddenError("Comment not found");
    }

    if (comment.author._id.toString() !== userId.toString()) {
      throw new ForbiddenError("Comment isn't allowed to update");
    }
    comment.content = data.content;
    await comment.save();
    pubsub.publish(connectionParam, {
      commentActions: {
        mutation: "UPDATED",
        node: comment,
      },
    });
    return comment;
  },
  deleteComment : async (commentId, req, pubsub, connectionParam) => {
    const userId = getAuthUser(req)
    const comment = await Comment.findById(commentId).populate("author").populate("post");
    if (!comment) {
      throw new ForbiddenError("Comment not found");
    }

    if (comment.author._id.toString() !== userId.toString()) {
      throw new ForbiddenError("Comment isn't allowed to update");
    }
    await Comment.findByIdAndDelete(commentId);
    pubsub.publish(connectionParam, {commentActions : {
      mutation : "DELETED" ,
      node : comment 
    }})
    return comment;
  }
};

export { commentController };
