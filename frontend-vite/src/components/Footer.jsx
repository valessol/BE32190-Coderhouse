import Navigation from "./navigation";

const Footer = () => {
  return (
    <footer className="bg-gray-950 p-4">
      <div className="min-w-[95%] my-12 mx-auto md:flex md:justify-between">
        <Navigation />
        <p className="text-white font-bold text-4xl">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
