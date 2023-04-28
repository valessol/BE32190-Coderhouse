import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import Spinner from "../components/Spinner";
import Fields from "../components/Fields";
import { registerFormConfig } from "../constants/forms";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);

  const validateFormValues = () => {
    const { password } = values;
    const allFieldsCompleted = !Object.values(values).includes("");

    if (!allFieldsCompleted) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        type: "error",
      });
      return false;
    }

    if (password.length < 6) {
      setAlert({
        msg: "Agrega un password de al menos 6 caracteres",
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
      const { password, username, email, phone } = values;
      const { data } = await axiosClient.post(`/auth/register`, {
        username,
        email,
        password,
        phone,
      });
      setAlert({ msg: data.msg, type: "success" });
    } catch (error) {
      setAlert({ msg: error.response.data.msg, type: "error" });
    }
    setLoading(false);
    setValues({ username: "", email: "", password: "", phone: "" });
  };

  return (
    <>
      <div className="md:w-2/3 lg:w-2/5 mx-auto">
        <h1 className="text-amber-500 font-black text-6xl capitalize">
          Registro
        </h1>

        {alert.msg && <Alert alert={alert} />}
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <Fields options={registerFormConfig} onChange={handleChange} />

          {loading ? (
            <button
              type="submit"
              className="bg-sky-700 w-full py-3 my-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            >
              <Spinner
                style={{
                  margin: "0",
                  width: "24px",
                  height: "24px",
                  display: "inline-block",
                  color: "white",
                }}
              />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-amber-500 w-full py-3 my-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            >
              {registerFormConfig.submitText}
            </button>
          )}
        </form>

        <nav className="lg:flex lg:justify-between">
          <Link
            to={registerFormConfig.linkUrl}
            className="block text-center my-5 text slate-500 uppercase text-lg"
          >
            {registerFormConfig.linkText}
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
