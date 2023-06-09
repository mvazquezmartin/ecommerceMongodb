const mongoose = require("mongoose");

const ticketCollection = "tickets";

const ticketSchema = {
  code: {
    type: String,
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: String,
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
  detailedItems: {
    type: [
      {
        product: String,
        quantity: Number,
        unitPrice: Number,
        totalPrice: Number,
      },
    ],
  },
};

const Tickets = mongoose.model(ticketCollection, ticketSchema);

module.exports = Tickets;
