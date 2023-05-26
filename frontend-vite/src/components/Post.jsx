import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";

const Post = ({ data }) => {
  const { _id, content, timestamp, title, imageUrl } = data;

  return (
    <article className="my-0 mx-auto max-w-7xl p-4">
      <img className="imagen" src={imageUrl} alt={`imagen blog ${title}`} />
      <div className="p-6">
        <h3 className="text-5xl text-amber-500 font-bold mb-4">{title}</h3>
        <p className="text-2xl text-amber-500">
          {formatDate(Number(timestamp))}
        </p>
        <p className="block h-48 overflow-hidden">{content}</p>

        <Link className="enlace" to={`/blog/${_id}`}>
          Leer Post
        </Link>
      </div>
    </article>
  );
};

export default Post;
