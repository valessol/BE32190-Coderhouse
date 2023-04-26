import {
  Form as RemixForm,
  useActionData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import Form from "../components/form";
import { loginFormConfig } from "../constants/forms";
import { validateLoginData } from "../utils/formValidations";
import { loginUser } from "../api/auth.server";
import { useEffect, useState } from "react";
import Message from "../components/message";

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

  const userData = await loginUser(data);

  if (userData.type === "error") {
    errors.push(userData.text);
    return errors;
  }
  return userData;
};

const Login = () => {
  const [messages, setMessages] = useState([]);
  const { authUser, setAuthUser } = useOutletContext();
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData && Array.isArray(actionData)) {
      const errorMessages = actionData.map((error) => {
        return { text: error, type: "error" };
      });
      setMessages(errorMessages);
    } else {
      setMessages([]);
      setAuthUser(actionData);
      // setUser(actionData);
    }
  }, [actionData]);

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser]);

  return (
    <>
      <h2 className="heading">Iniciar sesión</h2>
      <main className="contenedor">
        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
          {messages.length
            ? messages.map((msg, index) => (
                <Message key={index} type={msg.type} text={msg.text} />
              ))
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
