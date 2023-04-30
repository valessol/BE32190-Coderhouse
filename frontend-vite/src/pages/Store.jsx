import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductsList from "../components/productsList";

const Store = () => {
  const { products, loading } = useContext(ProductsContext);

  if (loading) return "Cargando...";
  return (
    <main className="min-w-[95%] mb-12 mt-0 mx-auto">
      <ProductsList data={products} title="Productos" />
    </main>
  );
};

export default Store;
