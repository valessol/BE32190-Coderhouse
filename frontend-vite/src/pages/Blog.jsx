import { useEffect, useState } from "react";
import axiosClient from "../config/axiosClient";
import List from "../components/List";
import Post from "../components/Post";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient("/blog");

      const formatData = () => {
        return data.map((d) => ({
          ...d,
          imageUrl: `${import.meta.env.VITE_CLOUDINARY_BASE_URL}/GuitarLA/${
            d.url
          }.jpg`,
        }));
      };

      setPosts(formatData());
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const options = {
    title: "Blog",
    Component: Post,
  };

  if (loading) return "Cargando...";

  return (
    <main className="min-w-[95%] mb-12 mt-0 mx-auto">
      <List data={posts} options={options} />
    </main>
  );
};
export default Blog;
