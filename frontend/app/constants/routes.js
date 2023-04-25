import carrito from "../../public/img/carrito.png";
export const routesConfig = [
  { path: "/", label: "Inicio" },
  { path: "/nosotros", label: "Nosotros" },
  { path: "/productos", label: "Tienda" },
  { path: "/blog", label: "Blog" },
  { path: "/carrito", image: carrito },
];
export const subRoutesConfig = [
  { path: "/register", label: "Registro" },
  { path: "/login", label: "Iniciar sesión" },
];
