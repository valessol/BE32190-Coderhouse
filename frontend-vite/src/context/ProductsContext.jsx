import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/axiosClient";

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInitialState();
  }, []);

  const setInitialState = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient("/products");

      const formatData = () => {
        return data.map((d) => ({
          ...d,
          imageUrl: `${import.meta.env.VITE_CLOUDINARY_BASE_URL}/GuitarLA/${
            d.url
          }.jpg`,
        }));
      };

      setProducts(formatData());
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getProductById = async (id) => {
    setLoading(true);
    try {
      const { data } = await axiosClient(`/products/${id}`);

      if (!Object.keys(data).length)
        return {
          msg: "El producto seleccionado no existe",
          type: "error",
        };

      const formatData = () => {
        return {
          ...data,
          imageUrl: `${import.meta.env.VITE_CLOUDINARY_BASE_URL}/GuitarLA/${
            data.url
          }.jpg`,
        };
      };
      setProduct(formatData());
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        product,
        getProductById,
        loading,
        // addToProducts,
        // updateProductOnProducts,
        // removeProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export default ProductsProvider;
