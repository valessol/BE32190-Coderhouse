const { Router } = require("express");
const AuthController = require("../controllers/auth.js");
const { auth } = require("../middlewares/auth.js");

const router = Router();

const authController = new AuthController();
router.get("/", auth, authController.authenticateUser);
router.get("/all", authController.getAll);
router.post("/register", authController.registerUser);
router.post("/login", authController.login);
router.get("/confirm/:token", authController.checkAccountVerificationToken);
router.delete("/:userId", authController.delete);

module.exports = router;
