const twilio = require("twilio");
const {
  ACCOUNT_SID,
  AUTH_TOKEN,
  SMS_NUMBER,
} = require("../config/twilio.config");

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
