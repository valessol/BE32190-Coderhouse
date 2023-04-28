import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import Alert from "../components/Alert";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState({});
  const { id } = useParams();
  const { product, getProductById } = useContext(ProductsContext);
  const { auth } = useContext(AuthContext);
  const { addToCart, setAuthUser } = useContext(CartContext);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    setAuthUser(auth);
  }, [auth]);

  const getProduct = async () => {
    await getProductById(id);
  };

  const { _id, description, price, title, imageUrl } = product;

  const handleChange = (e) => {
    setMessage({});
    const selectedQuantity = +e.target.value;
    setQuantity(selectedQuantity);

    if (!selectedQuantity)
      setMessage({
        msg: "Selecciona una cantidad",
        type: "error",
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quantity)
      return setMessage({
        msg: "Selecciona una cantidad",
        type: "error",
      });

    if (!auth._id)
      return setMessage({
        msg: "Inicia sesión para comenzar a agregar productos",
        type: "error",
      });

    const selectedProduct = {
      _id,
      quantity,
    };

    await addToCart(selectedProduct);
    setMessage({ msg: "Añadido al carrito", type: "success" });
  };
  //TODO: bloquear boton si no hay stock
  return (
    <div className="grid gap-4 grid-cols-[2fr_3fr] items-center max-w-6xl my-0 mx-auto">
      <img src={imageUrl} alt={`Imagen de la guitarra ${title}`} />

      <div className="p-4">
        <h3 className="text-6xl uppercase text-amber-500 font-bold">{title}</h3>
        <p className="texto my-8">{description}</p>
        <p className="text-6xl text-amber-500 m-0 font-black">$ {price}</p>
        {message.msg ? <Alert alert={message} /> : null}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="my-4 text-4xl" htmlFor="cantidad">
            Cantidad
          </label>
          <select
            className="text-center p-4 border rounded"
            name="cantidad"
            id="cantidad"
            onChange={handleChange}
          >
            <option value="">--Seleccione--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <input
            className="mt-12 bg-gray-950 text-white uppercase p-6 font-bold border-none transition-colors hover:cursor-pointer hover:bg-amber-500"
            type="submit"
            value="Agregar al carrito"
          />
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
