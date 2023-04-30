const { compareSync } = require("bcrypt");
const {
  existUser,
  registerUser,
  loginUser,
  checkUserAccountToken,
} = require("../services/auth.js");
const { generateAuthToken } = require("../middlewares/auth.js");

class Controller {
  constructor() {}

  registerUser = async (req, res) => {
    try {
      const { email } = req.body;
      const isRegisteredUser = await existUser({ email });

      if (isRegisteredUser) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message });
      }

      await registerUser(req.body);
      res.status(201).json({
        msg: "Registro con éxito. Revisa tu bandeja de entrada para confirmar tu cuenta",
      });
    } catch (error) {
      res.json({ msg: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await loginUser({ email, password });

      if (!userData) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
      }

      if (!userData.confirmed) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message });
      }

      const isCheckedPassword = compareSync(password, userData.password);

      if (!isCheckedPassword) {
        const error = new Error("El password es incorrecto");
        return res.status(403).json({ msg: error.message });
      }
      const user = {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        token: generateAuthToken({ _id: userData._id }),
      };

      res.json({ ...user });
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  };

  authenticateUser = async (req, res) => {
    const { user } = req;
    res.json(user);
  };

  checkAccountVerificationToken = async (req, res) => {
    const { token } = req.params;
    console.log(token);
    const confirmedUser = await checkUserAccountToken(token);

    if (!confirmedUser) {
      const error = new Error("Token no válido");
      return res.status(403).json({ msg: error.message });
    }

    res.json({ msg: "Usuario confirmado correctamente" });
  };
}

module.exports = Controller;
