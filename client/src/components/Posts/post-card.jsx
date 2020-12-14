import React from 'react'
import styles from "../../styles/post-card.module.scss"
import Moment from "react-moment"
const PostCard = ({post}) => {
  console.log(post)
  return (
    <article className={styles.postCard}>
      <h2>{post.title}<Moment className={styles.date} format="D MMM YYYY">{new Date(+post.updatedAt).toLocaleString()}</Moment></h2>
      <p className={styles.content}>
        {post.content.length > 50 ? `${post.content.slice(0,50)}...` : post.content }
      </p>
      <h4 className={styles.author}>Author : {post.author.name}</h4>
    </article>
  )
}

export default PostCard
