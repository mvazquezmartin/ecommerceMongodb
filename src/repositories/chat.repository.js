class ChatManagerRepository {
  constructor(chatManager) {
    this.chatManager = chatManager;
  }

  async create(msj) {
    return await this.chatManager.create(msj);
  }
}

module.exports = ChatManagerRepository;
