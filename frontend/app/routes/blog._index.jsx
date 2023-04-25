import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getAllPosts } from "~/api/blog.server";
import PostsList from "../components/postsList";

export const meta = () => {
  return [
    { title: `GuitarLA - Nuestro blog"}` },
    {
      description: `Guitarras, blog de música y venta de guitarras`,
    },
  ];
};

export const loader = async () => {
  return await getAllPosts();
};

const Blog = () => {
  const posts = useLoaderData();
  return <PostsList data={posts} />;
};

export default Blog;
