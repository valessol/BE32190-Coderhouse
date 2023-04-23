import { Link } from "@remix-run/react";
import { formatDate } from "~/utils/helpers";

const Post = ({ post }) => {
  const { id, content, timestamp, title, imageUrl } = post;

  return (
    <article className="post">
      <img className="imagen" src={imageUrl} alt={`imagen blog ${title}`} />
      <div className="contenido">
        <h3>{title}</h3>
        <p className="fecha">{formatDate(timestamp)}</p>
        <p className="resumen">{content}</p>

        <Link className="enlace" to={`/posts/${id}`}>
          Leer Post
        </Link>
      </div>
    </article>
  );
};

export default Post;
