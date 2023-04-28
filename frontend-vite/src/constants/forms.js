export const registerFormConfig = {
  fields: [
    {
      label: "Nombre*",
      id: "username",
      type: "text",
      placeholder: "John Doe",
    },
    {
      label: "Teléfono",
      id: "phone",
      type: "tel",
      placeholder: "1234567890",
    },
    {
      label: "Email*",
      id: "email",
      type: "email",
      placeholder: "johndoe@example.com",
    },
    {
      label: "Contraseña*",
      id: "password",
      type: "password",
      placeholder: "********",
    },
  ],
  submitText: "Registrar",
  linkText: "Ya estoy registrado",
  linkUrl: "/",
};

export const loginFormConfig = {
  fields: [
    {
      label: "Email*",
      id: "email",
      type: "text",
      placeholder: "example@example.com",
    },
    {
      label: "Contraseña*",
      id: "password",
      type: "password",
      placeholder: "********",
    },
  ],
  submitText: "Iniciar sesión",
  linkText: "Aún no estoy registrado",
  linkUrl: "/registrar",
};
