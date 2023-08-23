class MessageRepository {
  constructor(msgTool) {
    this.messageTool = msgTool;
  }

  async send(newUserInfo) {
    await this.messageTool.send(newUserInfo);
  }

  async alertDelete(info) {
    await this.messageTool.alertDelete(info);
  }

  async changePassword(user, link) {
    await this.messageTool.changePassword(user, link);
  }
}

module.exports = MessageRepository;
