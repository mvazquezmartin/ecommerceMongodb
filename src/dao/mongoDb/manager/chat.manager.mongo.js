const Messages = require("../models/chat.model");

class MessagesDao {
  async getAll() {
    try {
      return await Messages.find();
    } catch (error) {
      throw error;
    }
  }

  async create(msj) {
    try {
      return await Messages.create(msj);
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      await Messages.deleteMany();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MessagesDao;
