const transport = require("../utils/mail.util")

class MailAdapter {
  async send(newUserInfo){
    await transport.sendMail({
      from:"mevm1991@gmail.com",
      to: newUserInfo.email,
      subject: `${newUserInfo.first_name}, Esto es una prueba`,
      html:`<h1>HOLA MUNDO</h1>`
    })
  }
}

module.exports = MailAdapter