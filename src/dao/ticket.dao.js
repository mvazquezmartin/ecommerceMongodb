const Tickets = require("./models/ticket.model");

class TicketsDao {
  async create(date, amount, purcharser) {
    try {
      return await Tickets.create(date, amount, purcharser);
    } catch (error) {
      throw error.message;
    }
  }
}

module.exports = TicketsDao;
