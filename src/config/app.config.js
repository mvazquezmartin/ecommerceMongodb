require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  environment: process.env.NODE_ENV,
};
