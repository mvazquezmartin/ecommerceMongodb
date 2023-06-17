const twilio = require("twilio");
require("dotenv").config();

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const SMS_NUMBER = process.env.TWILIO_NUMBER;

class SmsAdapter {
  async sndMessage(newUserInfo) {
    const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

    await client.messages.create({
      body: `Hola! ${newUserInfo.first_name}`,
      from: SMS_NUMBER,
      to: newUserInfo.phone,
    });
  }
}

module.exports = SmsAdapter;
