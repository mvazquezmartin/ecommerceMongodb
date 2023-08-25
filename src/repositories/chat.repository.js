class ChatManagerRepository {
  constructor(chatManager) {
    this.chatManager = chatManager;
  }

  async getAll() {
    return await this.chatManager.getAll();
  }

  async create(msj) {
    return await this.chatManager.create(msj);
  }

  async deleteAll() {
    await this.chatManager.deleteAll();
  }
}

module.exports = ChatManagerRepository;
