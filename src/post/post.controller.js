import { Post } from "./post.model"
const postController = {
  posts :async query => Post.find({title : new RegExp(`${query}`,"i"), status : "public"})
}

export {postController}