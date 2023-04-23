import { useLoaderData } from "@remix-run/react";
import { getProductById } from "../api/productos.server";
import styles from "~/styles/guitarras.css";

export const loader = async ({ params }) => {
  const { id } = params;
  const data = await getProductById(id);

  return data;
};

export const meta = ({ data }) => {
  return [
    { title: `GuitarLA - ${data ? data.title : "Guitarra no encontrada"}` },
    {
      description: `Guitarras, venta de guitarras, guitarra ${
        data ? data.title : ""
      }`,
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

const Guitarra = () => {
  const data = useLoaderData();
  const { id, description, price, title, imageUrl, stock } = data;
  return (
    <main className="contenedor guitarra">
      <img
        className="imagen"
        src={imageUrl}
        alt={`Imagen de la guitarra ${title}`}
      />

      <div className="contenido">
        <h3>{title}</h3>
        <p className="texto">{description}</p>
        <p className="precio">{price}</p>
      </div>
    </main>
  );
};

export default Guitarra;
