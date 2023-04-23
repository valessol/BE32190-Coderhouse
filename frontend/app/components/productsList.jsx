import React from "react";
import Product from "./product";

const ProductsList = ({ data }) => {
  return (
    <>
      <h2 className="heading">Guitarras</h2>

      {data?.length && (
        <div className="guitarras-grid">
          {data.map((guitarra) => (
            <Product key={guitarra.url} data={guitarra} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsList;
