import React from "react";
import Product from "./product";

const ProductsList = ({ data }) => {
  return (
    <>
      <h2 className="heading">Productos</h2>

      {data?.length && (
        <div className="guitarras-grid">
          {data.map((prod) => (
            <Product key={prod.url} data={prod} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsList;
