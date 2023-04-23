export const validateRegisterData = (formData) => {
  let errors = [];
  const isValidEmail = getEmailValidation(formData.email);

  const { phone: omit, ...requiredValues } = formData;

  if (Object.values(requiredValues).includes("")) {
    errors = [...errors, "Los campos marcados con * son obligatorios"];
  }

  if (!isValidEmail) errors = [...errors, "El email no es válido"];

  const isSamePassword = formData.password === formData["password-repeat"];

  if (!isSamePassword) errors = [...errors, "Las contraseñas no coinciden"];

  return errors;
};

export const validateLoginData = (formData) => {
  let errors = [];

  if (Object.values(formData).includes("")) {
    errors = [...errors, "Todos los campos son obligatorios"];
  }
  return errors;
};

const getEmailValidation = (email) => {
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return regex.test(email);
};
