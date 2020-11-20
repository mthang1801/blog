import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    requried: true
  },
  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "users" , 
    required : true 
  }, 
  post : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "posts",
    required : true 
  }
},{timestamps : true })

const Comment = mongoose.model("comments", CommentSchema);

export {Comment};