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
    const navConfig = routesConfig.map(({ path, label }) => {
      let active = "";
      if (path === location.pathname) active = "active";
      return {
        path,
        label,
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
            {nav.label}
          </Link>
        ))}
    </nav>
  );
};

export default Navigation;
