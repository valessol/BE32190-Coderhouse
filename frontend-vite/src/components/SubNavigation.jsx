import { Link } from "react-router-dom";
import { subRoutesConfig } from "../constants/routes";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SubNavigation = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="flex items-center gap-8">
      {auth._id ? (
        <button
          type="button"
          className="font-bold text-2xl text-white uppercase decoration-none p-2 transition-colors cursor-pointer"
          onClick={logout}
        >
          Cerrar sessión
        </button>
      ) : (
        subRoutesConfig.map((nav) => (
          <Link
            key={nav.path}
            to={nav.path}
            className={`font-bold text-2xl text-white uppercase decoration-none p-2 transition-colors`}
          >
            {nav.label}
          </Link>
        ))
      )}
    </nav>
  );
};

export default SubNavigation;
