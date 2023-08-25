const fs = require("fs");

class ChatManager {
  constructor(path) {
    (this.messages = []), (this.path = path);
  }

  async getAll() {
    try {
      await this.readFile();
      return this.messages;
    } catch (error) {
      throw error;
    }
  }

  async create(msj) {
    try {
      const newMsj = { ...msj };

      await this.readFile();
      this.messages.push(newMsj);

      await this.saveFile();
      return newMsj;
    } catch (error) {
      throw error;
    }
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.messages));
    } catch (error) {
      throw error;
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      if (data) this.messages = JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ChatManager;
