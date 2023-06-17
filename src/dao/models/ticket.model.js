const mongoose = require("mongoose");

const ticketCollection = "tickets";

const ticketSchema = {
  code: {
    type: String,
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    index: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
};

const Tickets = mongoose.model(ticketCollection, ticketSchema);

module.exports = Tickets;
