const jwt = require("jsonwebtoken");
const { PRIVATEKEY } = require("../config/jwt.config");


const generateToken = (user) => {
  const token = jwt.sign(user, PRIVATEKEY, { expiresIn: "1d" });
  return token;
};

module.exports = {
  generateToken,
};
