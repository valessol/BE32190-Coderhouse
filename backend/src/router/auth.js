const { Router } = require("express");
const AuthController = require("../controllers/auth.js");
const { auth } = require("../middlewares/jwt.js");
//const passport = require("../middlewares/passport.js");

const router = Router();

const authController = new AuthController();

// router.use(passport.initialize());
// router.use(passport.session());

// router.post(
//   "/login",
//   passport.authenticate("login", {
//     failureRedirect: "/login-error",
//     successRedirect: "/",
//   })
// );
router.get("/", auth, authController.authenticateUser);
router.post("/login", authController.login);
router.post("/register", authController.registerUser);

module.exports = router;
