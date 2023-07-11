const Tickets = require("./models/ticket.model");

class TicketsDao {
  async create(ticket) {
    try {
      const newTicket = {
        code: ticket.code,
        purchase_datetime: ticket.date,
        amount: ticket.amount,
        purchaser: ticket.purchaser,
        detailedItems: ticket.detailedItems
      };
      return await Tickets.create(newTicket);
    } catch (error) {
      throw error.message;
    }
  }
}

module.exports = TicketsDao;
