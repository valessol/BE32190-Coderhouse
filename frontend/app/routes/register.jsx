import {
  useActionData,
  useNavigate,
  useOutletContext,
  Form as RemixForm,
} from "@remix-run/react";
import Form from "../components/form";
import { registerFormConfig } from "../constants/forms";
import { useEffect, useState } from "react";
import { validateRegisterData } from "../utils/formValidations";
import { registerUser } from "../api/auth.server";
import Message from "../components/message";
import { redirect } from "@remix-run/node";

export const meta = () => {
  return [
    { title: `GuitarLA - Registro"}` },
    {
      description: `Guitarras, blog de música y venta de guitarras`,
    },
  ];
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = validateRegisterData(data);

  if (errors.length) return { data: {}, errors };

  const { username, phone, email, password } = data;
  const formattedData = {
    username,
    phone: Number(phone),
    email,
    password,
  };
  const registerData = await registerUser(formattedData);
  const { authorized } = registerData;
  if (authorized) return redirect("/login");
  return { data: {}, errors: ["Error en el registro. Intente nuevamente."] };
};

const Register = () => {
  const { setAuthUser } = useOutletContext();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState([]);
  const [messages, setMessages] = useState([]);
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.data) setData(actionData.data);
    if (actionData?.errors) setErrors(actionData.errors);
  }, [actionData]);

  useEffect(() => {
    if (Object.keys(data)) {
      setAuthUser(true);
      navigate("/");
    }
  }, [data]);

  // const handleChange = (e) => {
  //   const newValues = {
  //     ...values,
  //     [e.target.name]: e.target.value,
  //   };

  //   setValues({ ...newValues });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { username, phone, email, password } = values;
  //   const formattedData = {
  //     username,
  //     phone: Number(phone),
  //     email,
  //     password,
  //   };
  //   const registerData = await registerUser(formattedData);
  //   console.log({ registerData });
  //   console.log({
  //     headers: registerData.access_token,
  //   });
  //   if (registerData.access_token) {
  //     localStorage.setItem("access_token", registerData.access_token);
  //     setAuthUser(true);
  //     navigate("/");
  //   }
  // };

  return (
    <>
      <h2 className="heading">Registro</h2>
      <main className="contenedor">
        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
          {errors?.length
            ? errors.map((error, index) => (
                <Message key={index}>{error}</Message>
              ))
            : null}
          <RemixForm method="POST" noValidate>
            <Form options={registerFormConfig} />
          </RemixForm>
          {/* <form onSubmit={handleSubmit} noValidate>
            <Form options={registerFormConfig} onChange={handleChange} />
          </form> */}
        </div>
      </main>
    </>
  );
};

export default Register;
