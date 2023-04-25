import { useEffect, useState } from "react";
import { Link, useOutletContext } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import styles from "~/styles/carrito.css";
import CartItem from "../components/cartItem";

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export const meta = () => {
  return [
    { title: "GuitarLA - Carrito de compras" },
    { description: "Venta de guitarras, blog de música" },
  ];
};

const Carrito = () => {
  const [total, setTotal] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const { cart } = useOutletContext();

  useEffect(() => {
    const newTotal =
      cart &&
      cart.reduce((total, item) => total + item.quantity * item.price, 0);
    setTotal(newTotal);
    if (cart.length) setDisabled(false);
    else setDisabled(true);
  }, [cart]);

  const handleClickFinishOrder = () => {
    console.log("btn");
  };

  return (
    <ClientOnly fallback={"Cargando..."}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de compras</h1>
          <div className="contenido">
            <div className="cart">
              <h2>Articulos</h2>
              {!cart.length
                ? "Carrito vacío"
                : cart.map((item) => <CartItem data={item} key={item.id} />)}
            </div>
            <aside>
              <div className="resume">
                <h3>Resumen del pedido</h3>
                <p>Total a pagar: ${total}</p>
              </div>
              <div className="resume-btn">
                <button
                  type="button"
                  className={`btn ${disabled ? "btn-disabled" : ""}`}
                  disabled={disabled}
                  onClick={handleClickFinishOrder}
                >
                  Finalizar pedido
                </button>
                <Link to="/productos" className="btn">
                  Seguir comprando
                </Link>
              </div>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
};

export default Carrito;
