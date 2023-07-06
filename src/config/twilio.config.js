require("dotenv").config()

module.exports = {
  ACCOUNT_SID : process.env.TWILIO_ACCOUNT_SID,
  AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  SMS_NUMBER: process.env.TWILIO_NUMBER,
}