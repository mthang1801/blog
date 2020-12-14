import React from "react";
import Title from "../components/Globals/title";
import { useQuery, gql } from "@apollo/client";
import Loader from "../components/UI/loader/loader.component";
import PostCard from "../components/Posts/post-card";
const getPosts = gql`
  query($title: String) {
    posts(query: $title) {
      _id
      title
      content
      author {
        name
        email
      }
      createdAt
      updatedAt
    }
  }
`;

const PostPage = () => {
  const { loading, error, data } = useQuery(getPosts, {
    variables: {
      title: "gatsby",
    },
    pollInterval: 500,
  });

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  return (
    <div className="container">
      <Title title="Our" subtitle="Posts" />
      {data.posts.length &&
        data.posts.map((post) => <PostCard key={post} post={post} />)}
    </div>
  );
};

export default PostPage;
