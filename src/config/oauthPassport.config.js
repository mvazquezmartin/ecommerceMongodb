require("dotenv").config()

module.exports={
  CLIENT_ID:process.env.CLIENT_ID,
  CLIENT_SECRET:process.env.CLIENT_SECRET,
  CALLBACK_URL: process.env.CALLBACK_URL
}