const transport = require("../utils/mail.util");

class MailAdapter {
  async send(newUserInfo) {
    await transport.sendMail({
      from: "mevm1991@gmail.com",
      to: newUserInfo.email,
      subject: `${newUserInfo.first_name}, WELCOME!`,
      html: `<h1>WELCOME!</h1>`,
    });
  }

  async alertDelete(info) {
    await transport.sendMail({
      from: "mevm1991@gmail.com",
      to: info.owner,
      subject: `Update on a product in our online store`,
      html: `<p>Unfortunately, due to certain circumstances, we have had to remove the product ${info.title}, Id: ${info._id} from our catalogue. This means that it will no longer be available for purchase. We apologize for any inconvenience this may have caused.</p>`,
    });
  }
}

module.exports = MailAdapter;
