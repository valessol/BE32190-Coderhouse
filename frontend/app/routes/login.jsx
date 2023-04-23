import {
  Form as RemixForm,
  useActionData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import Form from "../components/form";
import { loginFormConfig } from "../constants/forms";
import { validateLoginData } from "../utils/formValidations";
import Error from "../components/message";
import { Response, redirect } from "@remix-run/node";
import { loginUser } from "../api/auth.server";
import { useEffect, useState } from "react";

export const meta = () => {
  return [
    { title: `GuitarLA - Login"}` },
    {
      description: `Guitarras, blog de música y venta de guitarras`,
    },
  ];
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = validateLoginData(data);

  if (errors.length) return errors;

  const loginData = await loginUser(data);
  const { user, access_token } = loginData;

  if (!user) throw new Response("Usuario no encontrado");
  if (!access_token) throw new Response("No autorizado");

  return redirect("/", {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });
};

const Login = () => {
  // const [data, setData] = useState({});
  // const [errors, setErrors] = useState([]);
  // const { setAuthUser } = useOutletContext();
  // const actionData = useActionData();
  // const navigate = useNavigate();
  const errors = useActionData();

  // useEffect(() => {
  //   if (actionData?.data) setData(actionData.data);
  //   if (actionData?.errors) setErrors(actionData.errors);
  // }, [actionData]);

  // console.log(data);
  // useEffect(() => {
  //   if (Object.keys(data) && data.access_token) {
  //     setAuthUser(true);
  //     navigate("/");
  //   }
  // }, [data]);

  return (
    <>
      <h2 className="heading">Iniciar sesión</h2>
      <main className="contenedor">
        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
          {errors?.length
            ? errors.map((error, index) => <Error key={index}>{error}</Error>)
            : null}
          <RemixForm method="POST" noValidate>
            <Form options={loginFormConfig} />
          </RemixForm>
        </div>
      </main>
    </>
  );
};

export default Login;
