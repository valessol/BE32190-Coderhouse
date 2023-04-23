import { Link } from "@remix-run/react";

const Product = ({ data }) => {
  const { _id, description, price, title, imageUrl } = data;

  return (
    <div className="guitarra">
      <img src={imageUrl} alt={`imagen guitarra ${title}`} />
      <div className="contenido">
        <h3>{title}</h3>
        <p className="descripcion">{description}</p>
        <p className="precio">${price}</p>

        <Link className="enlace" to={`/productos/${_id}`}>
          Ver producto
        </Link>
      </div>
    </div>
  );
};

export default Product;
