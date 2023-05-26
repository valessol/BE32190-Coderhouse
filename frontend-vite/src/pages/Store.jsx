import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import List from "../components/List";
import Product from "../components/Product";

const Store = () => {
  const { products, loading } = useContext(ProductsContext);

  const options = {
    title: "Productos",
    Component: Product,
  };

  if (loading) return "Cargando...";
  return (
    <main className="min-w-[95%] mb-12 mt-0 mx-auto">
      <List data={products} options={options} />
    </main>
  );
};

export default Store;
