const nodemailer = require("nodemailer")
require("dotenv").config()

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth:{
    user:"mevm1991@gmail.com",
    pass: process.env.TRANSPORT_PW
  }
})

module.exports = transport