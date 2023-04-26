import { useEffect, useState } from "react";
import axiosClient from "../config/axiosClient";

const CartContext = (authUser) => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    if (authUser) setInitialState();
    else setCart({});
  }, [authUser]);
  console.log({ authUser });

  const getHeader = (token) => ({
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const setInitialState = async () => {
    try {
      const token = authUser.token;
      const id = authUser._id;

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      console.log(config);
      const { data } = await axiosClient(`/cart/${id}`, config);
      setCart(data);
    } catch (error) {
      //TODO:
      console.log("que retorna el error de esto?", error);
      return error;
    }
  };

  const addToCart = async (product) => {
    console.log("adding...");
    try {
      const token = authUser.token;
      const id = authUser._id;

      if (!token) return;

      const { data } = await axiosClient.post(
        `/cart/${id}`,
        product,
        getHeader(token)
      );

      setCart(data);
    } catch (error) {
      //TODO:
      console.log("que retorna el error de esto?", error);
      return error;
    }
  };

  const updateProductOnCart = async (product) => {
    try {
      const token = authUser.token;
      const userId = authUser._id;
      const productId = product._id;

      if (!token) return;

      const { data } = await axiosClient.put(
        `/cart/${userId}/${productId}`,
        product,
        getHeader(token)
      );

      setCart(data);
    } catch (error) {
      //TODO:
      console.log("que retorna el error de esto?", error);
      return error;
    }
  };

  const removeCart = async () => {
    try {
      const token = authUser.token;
      const userId = authUser._id;

      if (!token) return;

      const { data } = await axiosClient.delete(
        `/cart/${userId}`,
        getHeader(token)
      );

      setCart(data);
    } catch (error) {
      //TODO:
      console.log("que retorna el error de esto?", error);
      return error;
    }
  };

  return {
    cart,
    addToCart,
    updateProductOnCart,
    removeCart,
  };
};
export default CartContext;
