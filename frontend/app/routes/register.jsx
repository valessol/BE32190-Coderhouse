import { useActionData, Form as RemixForm } from "@remix-run/react";
import Form from "../components/form";
import { registerFormConfig } from "../constants/forms";
import { useEffect, useState } from "react";
import { validateRegisterData } from "../utils/formValidations";
import { registerUser } from "../api/auth.server";
import Message from "../components/message";

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

  if (errors.length) return errors;
  // TODO validar repetición de contraseñas
  const { username, phone, email, password } = data;
  const formattedData = {
    username,
    phone: Number(phone),
    email,
    password,
  };
  return await registerUser(formattedData);
};

const Register = () => {
  const [messages, setMessages] = useState([]);
  const actionData = useActionData();

  useEffect(() => {
    if (actionData && Array.isArray(actionData)) {
      const errorMessages = actionData.map((error) => {
        return { text: error, type: "error" };
      });
      setMessages(errorMessages);
    } else if (actionData) {
      setMessages([actionData]);
    } else setMessages([]);
  }, [actionData]);

  return (
    <>
      <h2 className="heading">Registro</h2>
      <main className="contenedor">
        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
          {messages.length
            ? messages.map((msg, index) => (
                <Message key={index} type={msg.type} text={msg.text} />
              ))
            : null}
          <RemixForm method="POST" noValidate>
            <Form options={registerFormConfig} />
          </RemixForm>
        </div>
      </main>
    </>
  );
};

export default Register;
