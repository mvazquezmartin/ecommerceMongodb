const Messages = require("./models/chat.model");

class MessagesDao {
  constructor() {}

  async addMessagesDb(msj) {
    try {
      return await Messages.create(msj);
    } catch (error) {
      return error;
    }
  }
}

module.exports = MessagesDao;
