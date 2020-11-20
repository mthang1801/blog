import mongoose, { mongo } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    comments : [{
      type : mongoose.Schema.Types.ObjectId, 
      ref : "comments",
      required : true 
    }],
    status: {
      type: String,
      enum: ["public", "private"],
      default : "public"
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", PostSchema);

export { Post };
