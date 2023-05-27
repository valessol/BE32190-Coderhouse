import { routesConfig } from "../constants/routes";
import Navigation from "./navigation";

const Footer = () => {
  const footerItems = routesConfig.filter((route) => route.path !== "/carrito");

  return (
    <footer className="bg-gray-950 p-4">
      <div className="min-w-[95%] my-12 mx-auto md:flex md:justify-between">
        <Navigation items={footerItems} />
        <p className="text-white font-bold text-4xl text-center mt-4 md:mt-0">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
