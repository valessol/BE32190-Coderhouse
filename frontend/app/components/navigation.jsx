import { Link, useLocation } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { routesConfig } from "../constants/routes";

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
    <nav className="navegacion">
      {navItems &&
        navItems.map((nav) => (
          <Link key={nav.path} to={nav.path} className={nav.active}>
            {nav.label ? nav.label : ""}
            {nav.image ? (
              <img src={nav.image} alt="carrito de compras" />
            ) : null}
          </Link>
        ))}
    </nav>
  );
};

export default Navigation;
