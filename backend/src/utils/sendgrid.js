const sgMail = require("@sendgrid/mail");
const config = require("../../config.js");

const sendConfirmEmail = async (email, username, token) => {
  sgMail.setApiKey(config.SENDGRID_API_KEY);

  const emailContent = {
    from: config.SENDGRID_USER,
    to: `<${email}>`,
    subject: "GuitarLA - Confirmación de la cuenta",
    text: "Comprueba tu cuenta en GuitarLA",
    html: `
    <p>Hola ${username}, gracias por registrarte en GuitarLA</p>
    <p>Tu cuenta está casi lista, sólo debes verificarla haciendo click en el siguiente enlace: </p>
    <a href="${config.FRONTEND_URL}/confirmar/${token}">Verificar cuenta</a>
    <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
  `,
  };

  try {
    sgMail
      .send(emailContent)
      .then(() => {
        console.log("Email enviado");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    return {
      msg: `Hubo un error al intentar enviar el correo de confirmación: ${error}`,
    };
  }
};

module.exports = sendConfirmEmail;
