import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const { getUserCart } = useContext(CartContext);
  const navigate = useNavigate();

  const validateFormValues = () => {
    const allFieldsCompleted = !Object.values(values).includes("");

    if (!allFieldsCompleted) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setAlert({});
    setLoading(false);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const areValidValues = validateFormValues();

    if (!areValidValues) {
      return setLoading(false);
    }

    try {
      const { password, email } = values;
      const { data } = await axiosClient.post(`/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setAuth(data);
      setAlert({
        msg: "Has iniciado sesión correctamente, redirigiendo a la tienda...",
        type: "success",
      });

      // Crear carrito cuando el usuario se loguea
      getUserCart();

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, type: "error" });
    }
    setLoading(false);
    setValues({ email: "", password: "" });
  };

  return (
    <>
      <div className="md:w-2/3 lg:w-2/5 mx-auto">
        <h1 className="text-amber-500 font-black text-6xl capitalize">
          Iniciar sesión
        </h1>
        {alert.msg && <Alert alert={alert} />}
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="text-gray-800 text-2xl" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className="mt-2 block w-full p-3 bg-gray-50 text-2xl"
            />
          </div>
          <div>
            <label className="text-gray-800 text-2xl" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
              placeholder="********"
              className="mt-2 block w-full p-3 bg-gray-50 text-2xl"
            />
          </div>

          <input
            type="submit"
            value="Iniciar sesión"
            className="bg-amber-500 w-full py-3 my-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-amber-600 transition-colors"
          />
        </form>
        <nav className="lg:flex lg:justify-between">
          <Link
            to="/registrar"
            className="block text-center my-5 text slate-500 uppercase text-lg"
          >
            ¿No tienes cuenta? Regístrate
          </Link>
        </nav>{" "}
      </div>
    </>
  );
};

export default Login;
