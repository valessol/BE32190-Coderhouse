import { useEffect, useState } from "react";
import { routesConfig } from "../constants/routes";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [navItems, setNavItems] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActiveClassName();
  }, [location.pathname]);

  const setActiveClassName = () => {
    const navConfig = routesConfig.map(({ path, label, image }) => {
      let active = "";
      if (path === location.pathname) active = "active";
      return {
        path,
        label,
        image,
        active,
      };
    });
    setNavItems(navConfig);
  };
  return (
    <nav className="flex items-center gap-8">
      {navItems &&
        navItems.map((nav) => (
          <Link
            key={nav.path}
            to={nav.path}
            className={`font-bold text-3xl text-white uppercase decoration-none p-2 transition-colors ${
              nav.active ? "bg-[#e99401]" : ""
            } hover:bg-[#e99401]`}
          >
            {nav.label ? nav.label : ""}
            {nav.image ? (
              <img src={nav.image} className="w-16" alt="carrito de compras" />
            ) : null}
          </Link>
        ))}
    </nav>
  );
};

export default Navigation;
