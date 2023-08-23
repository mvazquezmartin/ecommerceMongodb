const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class TicketsManager {
  constructor(path) {
    this.tickets = [];
    this.paht = path;
  }
}

module.exports = TicketsManager;
