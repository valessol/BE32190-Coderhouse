const nodemailer = require("nodemailer");
const config = require("../../config");

const sendConfirmEmail = async (email, username, token) => {
  let transporter = nodemailer.createTransport({
    service: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: config.MAIL_ADDRESS,
      pass: config.MAIL_PASS,
    },
  });

  const emailContent = {
    from: '"GuitarLA" <account@guitarla.com>',
    to: "elisa.farrell84@ethereal.email",
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
    const info = await transporter.sendMail(emailContent);
  } catch (error) {
    return {
      msg: `Hubo un error al intentar enviar el correo de confirmación: ${error}`,
    };
  }
};

module.exports = sendConfirmEmail;
