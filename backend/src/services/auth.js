const fs = require("fs");
const { hash: getHash, genSalt, compareSync } = require("bcrypt");
const DAOFactory = require("../models/DAOs/DAOFactory.js");
const usersSchema = require("../models/schemas/users.js");
const User = require("../models/model/User.js");
const { generateAuthToken } = require("../middlewares/jwt.js");

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
  return { ...user, timestamp: new Date() };
};

const existUser = async (email) => {
  try {
    // const usersData = JSON.parse(
    //   await fs.promises.readFile("./src/data/users.json", "utf-8")
    // );

    // if (usersData && usersData.length) {
    //   const isRegisteredUser = usersData.some(
    //     (user) => user.email === userData.email
    //   );
    //   return isRegisteredUser;
    // }
    // return false;
    return await services.existItem({ ...email });
  } catch (error) {
    return new Error("No se ha podido encontrar al usuario");
  }
};

registerUser = async (userData) => {
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
    const access_token = generateToken({ id: savedUser._id });
    return access_token;
  } catch (err) {
    throw new Error(err);
  }
};

loginUser = async (userData) => {
  try {
    const { email, password } = userData;
    const users = await this.getUsers();
    const user = users.find((user) => user.email === email);

    if (!user) return { error: "usuario no encontrado" };

    const isCheckedPassword = compareSync(password, user.password);

    if (!isCheckedPassword) return { error: "password incorrecto" };

    const access_token = this.generateToken({ id: user._id });

    return access_token;
  } catch (err) {
    throw new Error(err);
  }
};

const generateToken = (user) => {
  const access_token = generateAuthToken(user);
  return { access_token };
};

getUsers = async () => {
  try {
    const users = await this.services.getItems();
    return users;
  } catch (err) {
    console.log(err);
  }
};

getUserById = async (_id) => {
  try {
    const user = await this.services.getById(_id);
    return user;
  } catch (err) {
    console.log(err);
  }
};

class AuthServices {
  static instance;

  constructor() {
    this.services = DAOFactory.get("users", usersSchema);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthServices();
    }
    return this.instance;
  }

  static validateUser(user) {
    try {
      User.validate(user);
      return true;
    } catch (error) {
      throw new Error("Usuario no válido");
    }
  }

  static setDefaultAttr(user) {
    return { ...user, timestamp: new Date() };
  }

  existUser = async (email) => {
    try {
      return await this.services.existItem({ ...email });
    } catch (error) {
      return new Error("No se ha podido encontrar al usuario");
    }
  };

  registerUser = async (userData) => {
    try {
      const { email, password } = userData;
      const salt = await genSalt(10);
      const hash = await getHash(password, salt);

      const newUser = AuthServices.setDefaultAttr({
        ...userData,
        password: hash,
      });

      if (!AuthServices.validateUser(newUser)) {
        return new Error("formato de usuario inválido");
      }

      const savedUser = await this.services.saveItem(newUser, { email });
      const access_token = this.generateToken({ id: savedUser._id });
      return access_token;
    } catch (err) {
      throw new Error(err);
    }
  };

  loginUser = async (userData) => {
    try {
      const { email, password } = userData;
      const users = await this.getUsers();
      const user = users.find((user) => user.email === email);

      if (!user) return { error: "usuario no encontrado" };

      const isCheckedPassword = compareSync(password, user.password);

      if (!isCheckedPassword) return { error: "password incorrecto" };

      const access_token = this.generateToken({ id: user._id });

      return access_token;
    } catch (err) {
      throw new Error(err);
    }
  };

  generateToken = (user) => {
    const access_token = generateAuthToken(user);
    return { access_token };
  };

  getUsers = async () => {
    try {
      const users = await this.services.getItems();
      return users;
    } catch (err) {
      console.log(err);
    }
  };

  getUserById = async (_id) => {
    try {
      const user = await this.services.getById(_id);
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  // updateProduct = async (_id, product) => {
  //   try {
  //     const updatedProduct = await this.services.updateItem(_id, product);
  //     return updatedProduct;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // deleteProduct = async (_id) => {
  //   try {
  //     const product = await this.services.deleteItem(_id);
  //     return product;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
}

module.exports = AuthServices.getInstance();
