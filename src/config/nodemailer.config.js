require("dotenv").config();

module.exports = {
  TRANSPORT: process.env.TRANSPORT_PW,
  EMAIL: process.env.TRANSPORT_EMAIL,
};
