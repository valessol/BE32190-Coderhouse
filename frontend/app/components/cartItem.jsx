import { useOutletContext } from "@remix-run/react";

const CartItem = ({ data }) => {
  const { id, title, price, quantity, imageUrl } = data;
  const { addToCart, deleteFromCart } = useOutletContext();

  const handleChange = (e) => {
    const newQuantity = +e.target.value;
    addToCart({ id, quantity: newQuantity });
  };

  return (
    <div className="item">
      <div>
        <img src={imageUrl} alt={`imagen guitarra ${title}`} />
      </div>
      <div>
        <p className="name">{title}</p>
        <p>Cantidad:</p>
        <select value={quantity} className="select" onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <p className="price">
          $ <span>{price}</span>
        </p>
        <p className="subtotal">
          Subtotal: $ <span>{price * quantity}</span>
        </p>
      </div>
      <button
        type="button"
        className="btn-delete"
        onClick={() => deleteFromCart(id)}
      >
        X
      </button>
    </div>
  );
};

export default CartItem;
