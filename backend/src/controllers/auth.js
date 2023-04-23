const AuthServices = require("../services/auth.js");

class Controller {
  constructor() {
    this.users = AuthServices;
  }

  registerUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      const isRegisteredUser = await this.users.existUser({
        email,
      });

      if (isRegisteredUser) return res.redirect("/register-error");

      const access_token = await this.users.registerUser({ email, password });

      res.status(201).json({
        message: "usuario creado",
        access_token: access_token.access_token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const access_token = await this.users.loginUser({ email, password });

    res.json({ ...access_token });
  };

  authenticateUser = async (req, res) => {
    const { id } = req.user;
    const user = await this.users.getUserById(id);

    if (!user) return res.json({ error: "usuario no autenticado" });

    const { password: omit, ...rest } = user;
    res.json({ user: rest });
  };
}

module.exports = Controller;
