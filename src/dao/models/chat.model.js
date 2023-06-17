const mongoose = require("mongoose");

const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
  user: String,
  message: String,
});

const Messages = mongoose.model(messagesCollection, messagesSchema);

module.exports = Messages;
