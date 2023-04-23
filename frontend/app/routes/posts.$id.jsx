import { useLoaderData } from "@remix-run/react";
import styles from "~/styles/blog.css";
import { getPostById } from "../api/blog.server";
import { formatDate } from "../utils/helpers";

export const loader = async ({ params }) => {
  const { id } = params;
  const data = await getPostById(id);

  return data;
};

export const meta = ({ data }) => {
  return [
    { title: `GuitarLA - ${data ? data.title : "Entrada no encontrada"}` },
    {
      description: `Guitarras, venta de guitarras, entrada ${
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

const PostView = () => {
  const data = useLoaderData();
  const { content, timestamp, title, imageUrl } = data;
  return (
    <article className="contenedor post mt-3">
      <img className="imagen" src={imageUrl} alt={`imagen blog ${title}`} />
      <div className="contenido">
        <h3>{title}</h3>
        <p className="fecha">{formatDate(timestamp)}</p>
        <p className="texto">{content}</p>
      </div>
    </article>
  );
};

export default PostView;
