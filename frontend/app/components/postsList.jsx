import React from "react";
import Post from "./post";

const PostsList = ({ data }) => {
  return (
    <>
      <h2 className="heading">Blog</h2>
      <div className="blog">
        {data.map((post) => (
          <Post key={post.url} post={post} />
        ))}
      </div>
    </>
  );
};

export default PostsList;
