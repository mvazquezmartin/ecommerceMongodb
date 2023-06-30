const TicketsDao = require("../dao/ticket.dao");

const ticketDao = new TicketsDao()

class TicketService {
  async create(ticket) {
    return await ticketDao.create(ticket);
  }
}

module.exports = TicketService;
