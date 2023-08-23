const transport = require("../utils/mail.util");

const linkURL = `http://localhost:8080`;

class MailAdapter {
  async send(newUserInfo) {
    await transport.sendMail({
      from: "mevm1991@gmail.com",
      to: newUserInfo.email,
      subject: `${newUserInfo.first_name}, WELCOME!`,
      html: `<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
          <h1>Welcome to Our Ecommerce Store!</h1>
      </div>
      <div style="font-size: 16px; line-height: 1.5;">
          <p>Dear ${newUserInfo.name},</p>
          <p>Thank you for joining our online store community. We are excited to have you on board and look forward to providing you with an exceptional shopping experience.</p>
          <p>Explore our wide range of products and take advantage of exclusive offers available only to our registered members.</p>
          <p>If you have any questions or need assistance, feel free to contact our support team. Happy shopping!</p>
      </div>
      <a style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;" href="${linkURL}">Start Shopping</a>
  </div>`,
    });
  }

  async alertDelete(info) {
    await transport.sendMail({
      from: "mevm1991@gmail.com",
      to: info.owner,
      subject: `Update on a product in our online store`,
      html: `<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
      <h1>Product Removal Notification</h1>
      </div>
      <div style="font-size: 16px; line-height: 1.5;">
      <p>Unfortunately, due to certain circumstances, we have had to remove the product <span style="font-weight: bold; color: #e74c3c;">${info.title}</span>, Id: <span style="font-weight: bold; color: #e74c3c;">${info._id}</span> from our catalogue. This means that it will no longer be available for purchase. We apologize for any inconvenience this may have caused.</p>
      </div>
  </div>
  `,
    });
  }

  async changePassword(user, link) {
    await transport.sendMail({
      from: "mevm1991@gmail.com",
      to: user.email,
      subject: `Recovery password`,
      html: `<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333333;">Password Recovery</h2>
      <p style="color: #555555; margin-bottom: 10px;">Hello ${user.first_name},</p>
      <p style="color: #555555; margin-bottom: 10px;">We received a request to reset your password for your account. If you did not make this request, please ignore this email.</p>
      <p style="color: #555555; margin-bottom: 10px;">To reset your password, click the button below:</p>
      <a style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none;" href="${link}" target="_blank">Reset Password</a>
      <p style="color: #555555; margin-bottom: 10px;">If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
      <a href="${link}" target="_blank"> Link </a>      
      <p style="color: #555555; margin-bottom: 10px;">If you have any questions or need further assistance, please contact our support team.</p>
      <p style="color: #555555; margin-bottom: 10px;">Best regards,</p>
      <p style="color: #555555; margin-bottom: 10px;">The Development Team</p>
  </div>
  `,
    });
  }
}

module.exports = MailAdapter;
