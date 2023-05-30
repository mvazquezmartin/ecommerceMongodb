require("dotenv").config();
const jwt = require("jsonwebtoken");

const PRIVATEKEY = process.env.PRIVATE_KEY;

const generateToken = (user) => {
  const token = jwt.sign(user, PRIVATEKEY, { expiresIn: "1d" });
  return token;
};

module.exports = {
  PRIVATEKEY,
  generateToken,
};
