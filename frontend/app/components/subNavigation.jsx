import { Link } from "@remix-run/react";
import { subRoutesConfig } from "../constants/routes";

const SubNavigation = () => {
  return (
    <nav className="navegacion">
      {subRoutesConfig &&
        subRoutesConfig.map((nav) => (
          <Link key={nav.path} to={nav.path} className={nav.active}>
            {nav.label}
          </Link>
        ))}
    </nav>
  );
};

export default SubNavigation;
