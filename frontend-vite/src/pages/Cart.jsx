import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { ProductsContext } from "../context/ProductsContext";
import Modal from "../components/Modal";

const Cart = () => {
  const [disabled, setDisabled] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [modal, setModal] = useState(false);
  const { cart, setAuthUser, setProducts, total } = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const { products } = useContext(ProductsContext);

  useEffect(() => {
    setAuthUser(auth);
  }, [auth]);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  useEffect(() => {
    if (!cart.products?.length) setDisabled(true);
    else setDisabled(false);
  }, [cart]);

  useEffect(() => {
    const productsToShow = cart?.products?.map((product) => {
      const foundProduct = products.find((prod) => prod._id === product._id);
      if (foundProduct) return { ...foundProduct, ...product };
    });

    setCartItems(productsToShow);
  }, [cart?.products]);

  const handleClickFinishOrder = () => {
    setModal(true);
  };

  const buttonsClassName = `mt-4 bg-gray-950 text-white uppercase p-6 font-bold border-none transition-colors md:mt-0 xl:flex-row hover:cursor-pointer hover:bg-amber-500 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-700 ${
    disabled ? "hover:bg-gray-400" : ""
  }`;

  return (
    <>
      <main className="min-w-[95%] mb-12 mt-0 mx-auto">
        <h1 className="text-6xl text-center font-black text-amber-500 my-20 mx-0">
          Carrito de compras
        </h1>
        <div className="grid gap-20 items-start md:grid-cols-[3fr_2fr]">
          <div className="p-12">
            <h2 className="font-bold text-6xl">Articulos</h2>
            {!cart.products?.length
              ? "Carrito vacío"
              : cartItems?.map((item) => (
                  <CartItem data={item} key={item._id} />
                ))}
          </div>
          <aside className="sticky top-12">
            <div className="bg-gray-200 p-12 rounded-2xl mb-4">
              <h3>Resumen del pedido</h3>
              <p>Total a pagar: ${total}</p>
            </div>
            <div className="flex flex-row gap-4 justify-end md:flex-col xl:flex-row">
              <button
                type="button"
                className={buttonsClassName}
                disabled={disabled}
                onClick={handleClickFinishOrder}
              >
                Finalizar pedido
              </button>
              <Link to="/" className={`text-center ${buttonsClassName}`}>
                Seguir comprando
              </Link>
            </div>
          </aside>
        </div>
      </main>

      {modal && <Modal onClose={() => setModal(false)} data={cartItems} />}
    </>
  );
};

export default Cart;
