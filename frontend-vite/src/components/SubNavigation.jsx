import { Link } from "react-router-dom";
import { subRoutesConfig } from "../constants/routes";

const SubNavigation = () => {
  return (
    <nav className="flex items-center gap-8">
      {subRoutesConfig &&
        subRoutesConfig.map((nav) => (
          <Link
            key={nav.path}
            to={nav.path}
            className={`font-bold text-2xl text-white uppercase decoration-none p-2 transition-colors`}
          >
            {nav.label}
          </Link>
        ))}
    </nav>
  );
};

export default SubNavigation;
