import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/axiosClient";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setInitialState();
  }, [user]);

  useEffect(() => {
    if (products.length) calculateTotal();
  }, [products, cart]);

  const getHeader = (token) => ({
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const setAuthUser = (authUser) => setUser(authUser);

  const setInitialState = async () => {
    try {
      const token = user.token;
      const id = user._id;

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

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
      const token = user.token;
      const id = user._id;

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
      const token = user.token;
      const userId = user._id;
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
      const token = user.token;
      const userId = user._id;

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
  console.log(cart);
  const calculateTotal = async () => {
    if (cart && cart?.products?.length) {
      const productsOnCart = cart.products;
      const cartItems = productsOnCart.map((product) => {
        const item = products.find((i) => i._id === product._id);
        if (item) return { ...item, ...product };
      });

      const newTotal = cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      setTotal(newTotal);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateProductOnCart,
        removeCart,
        setAuthUser,
        calculateTotal,
        total,
        setProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
