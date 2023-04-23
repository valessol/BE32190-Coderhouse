import {
  Meta,
  Links,
  Outlet,
  LiveReload,
  Scripts,
  Link,
  useRouteError,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import styles from "~/styles/index.css";
import Header from "~/components/header";
import Footer from "~/components/Footer";
import AuthContext from "./context/auth";

export const meta = () => {
  return [
    { charset: "utf-8" },
    { title: "GuitarLA - Remix" },
    { viewport: "width=device-width,initial-scale=1" },
  ];
};

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap",
    },
    {
      rel: "stylesheet",
      href: stylesheet,
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

const App = () => {
  return (
    <Document>
      <Outlet context={AuthContext()} />
    </Document>
  );
};

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <LiveReload />

        <Scripts />
      </body>
    </html>
  );
}

/** Manejo de errores */

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <Document>
      <p className="error">
        {error.status} {error.statusText}
      </p>
      <Link className="error-enlace" to="/">
        Volver a la página principal
      </Link>
    </Document>
  );
}

export default App;
