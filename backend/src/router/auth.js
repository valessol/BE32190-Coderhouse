const { Router } = require("express");
const AuthController = require("../controllers/auth.js");
const { auth } = require("../middlewares/auth.js");

const router = Router();

const authController = new AuthController();

router.post("/register", authController.registerUser);
router.post("/login", authController.login);
router.post(
  "/confirmAccount/:account-token",
  authController.checkAccountVerificationToken
);
router.get("/", auth, authController.authenticateUser);

module.exports = router;
