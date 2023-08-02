const jwt = require("jsonwebtoken");
const { PRIVATEKEY } = require("../config/jwt.config");

const generateToken = (user, expires) => {
  const token = jwt.sign(user, PRIVATEKEY, { expiresIn: expires });
  return token;
};

module.exports = {
  generateToken,
};
