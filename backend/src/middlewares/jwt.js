const jwt = require("jsonwebtoken");
const config = require("../../config.js");

const generateAuthToken = (data) => {
  return jwt.sign({ data }, config.JWT_PRIVATE_KEY, {
    expiresIn: config.JWT_EXPIRATION_TIME,
  });
};

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "no autenticado" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "no autorizado" });
    }
    req.user = decoded.data;

    next();
  });
};

module.exports = { generateAuthToken, auth };
