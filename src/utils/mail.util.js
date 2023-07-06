const nodemailer = require("nodemailer");
const { TRANSPORT } = require("../config/nodemailer.config");

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "mevm1991@gmail.com",
    pass: TRANSPORT,
  },
});

module.exports = transport;
