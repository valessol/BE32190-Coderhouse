import React from "react";
import { useLoaderData } from "@remix-run/react";
import { getAllProducts } from "../api/productos.server";
import ProductsList from "../components/productsList";

export const meta = () => {
  return [
    { title: "GuitarLA - Tienda" },
    { description: "Nuestra colección de Guitarras" },
  ];
};

export const loader = async () => {
  return await getAllProducts();
};

const Tienda = () => {
  const data = useLoaderData();

  return <ProductsList data={data} title="Productos" />;
};

export default Tienda;
