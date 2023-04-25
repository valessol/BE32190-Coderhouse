import axios from "axios";

export const getAllProducts = async () => {
  const { data } = await axios(`${process.env.API_URL}/products`);

  const formatData = () => {
    return data.map((d) => ({
      ...d,
      imageUrl: `${process.env.CLOUDINARY_BASE_URL}/GuitarLA/${d.url}.jpg`,
    }));
  };

  return formatData();
};

export const getProductById = async (id) => {
  const fetchedData = await fetch(`${process.env.API_URL}/products/${id}`);
  const data = await fetchedData.json();

  if (!Object.keys(data).length)
    throw new Response("", {
      status: 404,
      statusText: "El producto seleccionado no existe",
    });

  const formatData = () => {
    return {
      ...data,
      imageUrl: `${process.env.CLOUDINARY_BASE_URL}/GuitarLA/${data.url}.jpg`,
    };
  };

  return formatData();
};

export const saveProduct = async (product) => {
  const response = await fetch(`${process.env.API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(product),
  });
  return await response.json();
};

export const updateProduct = async (id, data) => {
  const response = await fetch(`${process.env.API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${process.env.API_URL}/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return await response.json();
};
