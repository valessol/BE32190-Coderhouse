import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getProductById, prueba } from "../api/productos.server";
import { useState } from "react";
import Message from "../components/message";
import axios from "axios";

// export const loader = async ({ params }) => {
//   const { id } = params;
//   const [product, cart] = await Promise.all([
//     getProductById(id),
//     getAllPosts(),
//   ]);
//   const productsData = await getProductById(id);

//   return data;
// };

export const loader = async ({ params }) => {
  const { id } = params;
  const data = await getProductById(id);

  return data;
};

export const meta = ({ data }) => {
  return [
    { title: `GuitarLA - ${data ? data.title : "Guitarra no encontrada"}` },
    {
      description: `Guitarras, venta de guitarras, guitarra ${
        data ? data.title : ""
      }`,
    },
  ];
};

const Guitarra = () => {
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState([]);
  const data = useLoaderData();
  const { authUser, addToCart } = useOutletContext();
  const { _id, description, price, title, imageUrl } = data;

  const handleChange = (e) => {
    setMessage([]);
    const selectedQuantity = +e.target.value;
    setQuantity(selectedQuantity);

    if (!selectedQuantity)
      setMessage([
        ...message,
        {
          text: "Selecciona una cantidad",
          type: "error",
        },
      ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quantity)
      return setMessage([
        ...message,
        {
          text: "Selecciona una cantidad",
          type: "error",
        },
      ]);

    if (!authUser._id)
      return setMessage([
        ...message,
        {
          text: "Inicia sesión para comenzar a agregar productos",
          type: "error",
        },
      ]);

    const selectedProduct = {
      _id,
      quantity,
    };

    await addToCart(selectedProduct);
    setMessage({ text: "Añadido al carrito", type: "success" });
  };
  //TODO: bloquear boton si no hay stock
  return (
    <div className="guitarra">
      <img
        className="imagen"
        src={imageUrl}
        alt={`Imagen de la guitarra ${title}`}
      />

      <div className="contenido">
        <h3>{title}</h3>
        <p className="texto">{description}</p>
        <p className="precio">$ {price}</p>
        {message.length
          ? message.map((msg, index) => (
              <Message key={index} type={msg.type} text={msg.text} />
            ))
          : null}
        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>
          <select name="cantidad" id="cantidad" onChange={handleChange}>
            <option value="">--Seleccione--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <input type="submit" value="Agregar al carrito" />
        </form>
      </div>
    </div>
  );
};

export default Guitarra;
