const mongoose = require("mongoose");

const collectionName = "messages";

const collectionSchema = new mongoose.Schema({
  user: String,
  messages: String,
});

const Messages = mongoose.model(collectionName, collectionSchema);

module.exports = Messages;
