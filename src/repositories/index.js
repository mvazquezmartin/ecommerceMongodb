const MessageRepository = require("./message.repository");
const MessageAdapter = require("./factory");

const msg = new MessageRepository(new MessageAdapter());

module.exports = msg;
