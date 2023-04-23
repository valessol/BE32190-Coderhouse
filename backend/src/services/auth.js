const crypto = require("crypto");
const { hash: getHash, genSalt } = require("bcrypt");
const DAOFactory = require("../models/DAOs/DAOFactory.js");
const usersSchema = require("../models/schemas/users.js");
const User = require("../models/model/User.js");

const services = DAOFactory.get("users", usersSchema);

const validateUser = (user) => {
  try {
    User.validate(user);
    return true;
  } catch (error) {
    throw new Error("Usuario no válido");
  }
};

const setDefaultAttr = (user) => {
  const token = generateAccountToken();
  return {
    ...user,
    timestamp: new Date(),
    token,
    confirmed: false,
  };
};

const existUser = async (email) => {
  try {
    return await services.existItem({ ...email });
  } catch (error) {
    return new Error("No se ha podido encontrar al usuario");
  }
};

const generateAccountToken = () => {
  try {
    const id = crypto.randomUUID();
    return id;
  } catch (err) {
    throw new Error(err);
  }
};

const registerUser = async (userData) => {
  try {
    const { email, password } = userData;
    const salt = await genSalt(10);
    const hash = await getHash(password, salt);

    const newUser = setDefaultAttr({
      ...userData,
      password: hash,
    });

    if (!validateUser(newUser)) {
      return new Error("formato de usuario inválido");
    }

    const savedUser = await services.saveItem(newUser, { email });
    // TODO: sacar los datos sensibles del usuario y enviar mail
    return savedUser;
  } catch (err) {
    throw new Error(err);
  }
};

const loginUser = async (userData) => {
  try {
    const { email } = userData;
    const users = await services.getItems();
    return users.find((user) => user.email === email);
  } catch (err) {
    throw new Error(err);
  }
};

const checkUserAccountToken = async (token) => {
  const users = await services.getItems();
  const user = users.find((user) => user.token === token);

  if (user) {
    try {
      user.confirmed = true;
      user.token = "";
      const updatedUser = await services.saveItem(user, { email: user.email });
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  existUser,
  registerUser,
  loginUser,
  checkUserAccountToken,
};
