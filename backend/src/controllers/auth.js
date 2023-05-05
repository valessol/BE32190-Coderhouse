const { compareSync } = require("bcrypt");
const {
  getAllUsers,
  existUser,
  registerUser,
  loginUser,
  checkUserAccountToken,
  deleteUser,
} = require("../services/auth.js");
const { generateAuthToken } = require("../middlewares/auth.js");

class Controller {
  constructor() {}

  getAll = async (req, res) => {
    try {
      const users = await getAllUsers();
      res.status(201).json(users);
    } catch (error) {
      res.json({ msg: error.message });
    }
  };

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
    const allUsers = await getAllUsers();
    const authorizedUser = allUsers.find(
      (authUser) => authUser._id === user._id
    );
    res.json(authorizedUser);
  };

  checkAccountVerificationToken = async (req, res) => {
    const { token } = req.params;
    const confirmedUser = await checkUserAccountToken(token);

    if (!confirmedUser?._id) {
      const error = new Error("Token no válido");
      return res.status(403).json({ msg: error.message });
    }

    res.json({ msg: "Usuario confirmado correctamente" });
  };

  delete = async (req, res) => {
    try {
      const { userId } = req.params;

      await deleteUser(userId);
      res.json({ msg: "Usuario eliminado correctamente" });
    } catch (error) {
      res.json({ msg: error.message });
    }
  };
}

module.exports = Controller;
