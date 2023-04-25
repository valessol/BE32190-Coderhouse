import { Outlet, useOutletContext } from "@remix-run/react";
import styles from "~/styles/productos.css";

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

const Tienda = () => {
  return (
    <main className="contenedor">
      <Outlet context={useOutletContext()} />
    </main>
  );
};

export default Tienda;
