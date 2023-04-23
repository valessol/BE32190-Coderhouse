export const getAllPosts = async () => {
  const fetchedData = await fetch(`${process.env.API_URL}/blog`);
  const data = await fetchedData.json();

  const formatData = () => {
    return data.map((d) => ({
      ...d,
      imageUrl: `${process.env.CLOUDINARY_BASE_URL}/v1680120548/GuitarLA/${d.url}.jpg`,
    }));
  };

  return formatData();
};

export const getPostById = async (id) => {
  const fetchedData = await fetch(`${process.env.API_URL}/blog/${id}`);
  const data = await fetchedData.json();

  if (!Object.keys(data).length)
    throw new Response("", {
      status: 404,
      statusText: "Entrada no encontrada",
    });

  const formatData = () => {
    return {
      ...data,
      imageUrl: `${process.env.CLOUDINARY_BASE_URL}/v1680120548/GuitarLA/${data.url}.jpg`,
    };
  };

  return formatData();
};
