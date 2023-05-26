import { useEffect, useState } from "react";
import axiosClient from "../config/axiosClient";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/helpers";

const Post = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient(`/blog/${id}`);

      const formatData = () => {
        return {
          ...data,
          imageUrl: `${import.meta.env.VITE_CLOUDINARY_BASE_URL}/GuitarLA/${
            data.url
          }.jpg`,
        };
      };

      setPost(formatData());
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const { content, timestamp, title, imageUrl } = post;

  if (loading) return "Cargando...";

  return (
    <article className="my-0 mx-auto max-w-7xl mt-12">
      <img className="imagen" src={imageUrl} alt={`imagen blog ${title}`} />
      <div className="p-6">
        <h3 className="text-5xl text-amber-500 font-black mb-4">{title}</h3>
        <p className="text-2xl text-amber-500">
          {formatDate(Number(timestamp))}
        </p>
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </article>
  );
};
export default Post;
