class MessageRepository {
  constructor(msgTool) {
    this.messageTool = msgTool;
  }
  
  async send(newUserInfo) {
    await this.messageTool.send(newUserInfo);
  }
}

module.exports = MessageRepository;
