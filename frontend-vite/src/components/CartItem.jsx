import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ data }) => {
  const { addToCart, deleteProductOnCart } = useContext(CartContext);
  const { _id } = data;

  const handleChange = (e) => {
    const newQuantity = +e.target.value;
    addToCart({ _id, quantity: newQuantity });
  };

  return (
    <div className="grid grid-cols-[1fr_3fr] gap-16 items-center py-12 px-0 border-b relative last:border-none">
      <div>
        <img src={data.imageUrl} alt={`imagen guitarra ${data.title}`} />
      </div>
      <div>
        <p className="mb-4 font-bold text-4xl text-amber-500">{data.title}</p>
        <p className="mb-4 text-3xl">Cantidad:</p>
        <select
          value={data.quantity}
          className="border text-center w-full rounded"
          onChange={handleChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
        <p className="text-3xl mt-4 mb-0 font-bold text-amber-500">
          $ <span className="font-black text-4xl">{data.price}</span>
        </p>
        <p className="mb-4 text-2xl subtotal">
          Subtotal: ${" "}
          <span className="font-black text-4xl">
            {data.price * data.quantity}
          </span>
        </p>
      </div>
      <button
        type="button"
        className="absolute top-12 right-4 cursor-pointer"
        onClick={() => deleteProductOnCart(_id)}
      >
        X
      </button>
    </div>
  );
};

export default CartItem;
