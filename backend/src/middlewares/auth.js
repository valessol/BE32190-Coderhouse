const jwt = require("jsonwebtoken");
const config = require("../../config.js");

const generateAuthToken = (data) => {
  return jwt.sign({ data }, config.JWT_PRIVATE_KEY, {
    expiresIn: config.JWT_EXPIRATION_TIME,
  });
};

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, config.JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "No autorizado" });
    }
    req.user = decoded.data;
    next();
  });
};

module.exports = { generateAuthToken, auth };
