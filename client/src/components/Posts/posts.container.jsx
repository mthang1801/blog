import React from "react";
import {gql, useQuery} from "@apollo/client"
import Posts from "./posts.component";
const GET_POSTS = gql`
  query posts($query : String){
    posts(query : $query) {
      _id
      title
      content
      author{
        name        
      }
      createdAt
    }
  }
`
const PostsContainer = () => {
  const {loading, error, data} = useQuery(GET_POSTS, {
    variables : {query : ""},
    pollInterval: 500
  })
  if(loading) return <p>Loading...</p>
  if(error) return <p>{error}</p>
  return <Posts data={data} />
}

export default PostsContainer

