import axios from "axios";

const getHeader = (token) => ({
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
});

export const getUserCart = async (user) => {
  try {
    const token = user.token;
    const id = user._id;

    if (!token) return;

    const { data } = await axios(
      `${process.env.API_URL}/cart/${id}`,
      getHeader(token)
    );
    return data;
  } catch (error) {
    //TODO:
    console.log("que retorna el error de esto?", error);
    return error;
  }
};

export const addProduct = async (user, product) => {
  try {
    const token = user.token;
    const id = user._id;

    if (!token) return;

    const { data } = await axios.post(
      `${process.env.API_URL}/cart/${id}`,
      product,
      getHeader(token)
    );
    return data;
  } catch (error) {
    //TODO:
    console.log("que retorna el error de esto?", error);
    return error;
  }
};

export const updateCart = async (user, product) => {
  try {
    const token = user.token;
    const userId = user._id;
    const productId = product._id;

    if (!token) return;

    const { data } = await axios.put(
      `${process.env.API_URL}/cart/${userId}/${productId}`,
      product,
      getHeader(token)
    );
    return data;
  } catch (error) {
    //TODO:
    console.log("que retorna el error de esto?", error);
    return error;
  }
};

export const deleteCart = async (user) => {
  try {
    const token = user.token;
    const userId = user._id;

    if (!token) return;

    const { data } = await axios.delete(
      `${process.env.API_URL}/cart/${userId}`,
      getHeader(token)
    );
    return data;
  } catch (error) {
    //TODO:
    console.log("que retorna el error de esto?", error);
    return error;
  }
};
