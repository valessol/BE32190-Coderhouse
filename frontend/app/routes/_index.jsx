import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getAllPosts } from "../api/blog.server";
import { getAllProducts } from "../api/productos.server";
import ProductsList from "../components/productsList";
import PostsList from "../components/postsList";
import Course from "../components/course";
import guitarStyles from "~/styles/productos.css";
import blogStyles from "~/styles/blog.css";
import courseStyles from "~/styles/course.css";
import { authUser } from "../api/auth.server";
import { redirect } from "@remix-run/node";

export const meta = () => {
  return [
    { title: `GuitarLA - Remix"}` },
    {
      description: `Guitarras, blog de música y venta de guitarras`,
    },
  ];
};

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: guitarStyles,
    },
    {
      rel: "stylesheet",
      href: blogStyles,
    },
    {
      rel: "stylesheet",
      href: courseStyles,
    },
  ];
};

export const loader = async ({ request }) => {
  // if (!authorization) return redirect("/login");

  // const user = await authUser(authorization);
  // console.log(user);
  // if (!user) return redirect("/login");

  const [products, posts] = await Promise.all([
    getAllProducts(),
    getAllPosts(),
  ]);

  const courseImageUrl = `${process.env.CLOUDINARY_BASE_URL}/GuitarLA/cursos_bg_phjenp.jpg`;
  return {
    products,
    posts,
    courseImageUrl,
  };
};

const Index = () => {
  const { products, posts, courseImageUrl } = useLoaderData();

  return (
    <>
      <main className="contenedor">
        <ProductsList data={products} title="Guitarras" />
      </main>
      <Course imageUrl={courseImageUrl} />
      <section className="contenedor">
        <PostsList data={posts} />
      </section>
    </>
  );
};

export default Index;
