import React from "react"
import "./posts.css"
const Posts = ({data}) => {
  const labels = ["_id", "title", "author_name", "createdAt"];
  const posts = data.posts.map(post => {
    const values = [];
   
    labels.forEach(label => {           
      if(label === "author_name"){
        values.push(post.author.name);
      }else if(label === "createdAt") {
          values.push(new Date(parseInt(post[label])).toLocaleString() )
      }      
      else{
        values.push(post[label])
      }
     
    })
    return values ;
  })

  return (
    <div className="container">
      <div className="table">
        <div className="table-heading">
          {labels.map((label,idx) => <p key={idx}>{label}</p>)}
        </div>
        <div className="table-body">
          {posts.map(post => <div className="row" key={post[0]}>
            {post.map((postItem,idx) => <p key={idx}>{postItem}</p>)}
          </div>)}
        </div>
      </div>
    </div>
  );
}


export default Posts