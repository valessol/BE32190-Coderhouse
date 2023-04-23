// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const { compareSync } = require("bcrypt");
// const AuthServices = require("../services/auth.js");

// passport.use(
//   "login",
//   new LocalStrategy(async (username, password, done) => {
//     const user = await findUser({ username });
//     if (!user) return done(null, false);

//     const isCheckedPassword = compareSync(password, user.password);

//     if (!isCheckedPassword) return done(null, false);

//     return done(null, user);
//   })
// );

// passport.serializeUser((user, done) => done(null, user.username));

// passport.deserializeUser(async (username, done) => {
//   const user = await findUser({ username });
//   user && done(null, user);
// });

// const findUser = async (userData) => {
//   const users = await AuthServices.getUsers();

//   if (users && users.length) {
//     const user = users.find((user) => user.username === userData.username);
//     return user;
//   }
//   return null;
// };

// module.exports = passport;
