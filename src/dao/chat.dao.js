const Messages = require("./models/chat.model");

class MessagesDao {
  constructor() {}

  async create(msj) {
    try {
      return await Messages.create(msj);
    } catch (error) {
      return error;
    }
  }
}

module.exports = MessagesDao;
