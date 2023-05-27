import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = ({ items, showActive }) => {
  const [navItems, setNavItems] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActiveClassName();
  }, [location.pathname]);

  const setActiveClassName = () => {
    const navConfig = items.map(({ path, label, image }) => {
      let active = "";
      if (path === location.pathname) active = "active";
      return {
        path,
        label,
        image,
        active: showActive ? active : "",
      };
    });
    setNavItems(navConfig);
  };
  return (
    <nav className="flex items-center gap-8 justify-center">
      {navItems &&
        navItems.map((nav) => (
          <Link
            key={nav.path}
            to={nav.path}
            className={`font-bold text-3xl text-white uppercase decoration-none p-2 transition-colors ${
              nav.active ? "bg-[#e99401]" : "bg-slate-800/50"
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
