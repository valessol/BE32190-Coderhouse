import { Link } from "@remix-run/react";
import logo from "../../public/img/logo.svg";
import Navigation from "./navigation";

const Header = () => {
  return (
    <header className="header">
      <div className="contenedor barra">
        <Link to="/">
          <img className="logo" src={logo} alt="imagen logo" />
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
