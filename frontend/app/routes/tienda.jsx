import React from "react";
import { useLoaderData } from "@remix-run/react";
import styles from "~/styles/guitarras.css";
import { getAllProducts } from "../api/productos.server";
import ProductsList from "../components/productsList";

export const meta = () => {
  return [
    { title: "GuitarLA - Tienda" },
    { description: "Nuestra colección de Guitarras" },
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
  return await getAllProducts();
};

const Tienda = () => {
  const data = useLoaderData();

  return (
    <main className="contenedor">
      <ProductsList data={data} />
    </main>
  );
};

export default Tienda;
