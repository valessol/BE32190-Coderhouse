import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getAllPosts } from "~/api/blog.server";
import styles from "~/styles/blog.css";
import PostsList from "../components/postsList";

export const meta = () => {
  return [
    { title: `GuitarLA - Nuestro blog"}` },
    {
      description: `Guitarras, blog de música y venta de guitarras`,
    },
  ];
};

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export const loader = async () => {
  return await getAllPosts();
};

const Blog = () => {
  const posts = useLoaderData();
  return (
    <main className="contenedor">
      <PostsList data={posts} />
    </main>
  );
};

export default Blog;
