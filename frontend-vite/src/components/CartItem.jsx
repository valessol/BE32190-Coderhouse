import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ProductsContext } from "../context/ProductsContext";

const CartItem = ({ data }) => {
  const [cartItem, setCartItem] = useState({});
  const { addToCart, deleteFromCart } = useContext(CartContext);
  const { products } = useContext(ProductsContext);
  const { _id, quantity } = data;

  useEffect(() => {
    const dbProduct = products.find((product) => product._id === _id);
    const cartProduct = { ...dbProduct, ...data };
    setCartItem(cartProduct);
  }, [data]);

  const handleChange = (e) => {
    const newQuantity = +e.target.value;
    addToCart({ _id, quantity: newQuantity });
  };

  return (
    <div className="grid grid-cols-[1fr_3fr] gap-16 items-center py-12 px-0 border-b relative last:border-none">
      <div>
        <img
          src={cartItem.imageUrl}
          alt={`imagen guitarra ${cartItem.title}`}
        />
      </div>
      <div>
        <p className="mb-4 font-bold text-4xl text-amber-500">
          {cartItem.title}
        </p>
        <p className="mb-4 text-3xl">Cantidad:</p>
        <select
          value={cartItem.quantity}
          className="border text-center w-full rounded"
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <p className="text-3xl mt-4 mb-0 font-bold text-amber-500">
          $ <span className="font-black text-4xl">{cartItem.price}</span>
        </p>
        <p className="mb-4 text-2xl subtotal">
          Subtotal: ${" "}
          <span className="font-black text-4xl">
            {cartItem.price * quantity}
          </span>
        </p>
      </div>
      <button
        type="button"
        className="absolute top-12 right-4 cursor-pointer"
        onClick={() => deleteFromCart(_id)}
      >
        X
      </button>
    </div>
  );
};

export default CartItem;
