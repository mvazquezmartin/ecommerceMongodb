const nodemailer = require("nodemailer");
const { TRANSPORT, EMAIL } = require("../config/nodemailer.config");

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: EMAIL,
    pass: TRANSPORT,
  },
});

module.exports = transport;
