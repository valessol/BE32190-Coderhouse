import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import SubNavigation from "./SubNavigation";
import Navigation from "./navigation";

const Header = () => {
  return (
    <header className="h-96 relative">
      <div className="absolute top-2 right-2">
        <SubNavigation />
      </div>
      <div
        className="w-full h-full bg-no-repeat bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url('${
            import.meta.env.VITE_CLOUDINARY_BASE_URL
          }/GuitarLA/cursos_bg_phjenp.jpg')`,
        }}
      >
        <div className="min-w-[95%] mx-auto flex items-center gap-8 justify-between">
          <Link to="/">
            <img className="w-96" src={logo} alt="imagen logo" />
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  );
};
export default Header;
