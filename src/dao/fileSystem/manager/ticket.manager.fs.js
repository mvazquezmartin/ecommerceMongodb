const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class TicketsManager {
  constructor(path) {
    this.tickets = [];
    this.paht = path;
  }

  async create(ticket) {
    try {
      const id = uuidv4();
      const newTicket = {
        _id: id,
        code: ticket.code,
        purchase_datetime: ticket.date,
        amount: ticket.amount,
        purchaser: ticket.purchaser,
        detailedItems: ticket.detailedItems,
      };

      await this.readFile();
      this.tickets.push(newTicket);
      await this.saveFile();

      return newTicket;
    } catch (error) {
      throw error;
    }
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.tickets));
    } catch (error) {
      throw error;
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      if (data) this.tickets = JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketsManager;
