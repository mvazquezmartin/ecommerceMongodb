const { v4: uuidv4 } = require("uuid");
const TicketsDao = require("../dao/mongoDb/manager/ticket.manager.mongo");
const TicketDto = require("../dtos/tickets.dto");
const amountAndDetails = require("../utils/ticketAmountDetails");

const ticketDao = new TicketsDao();

class TicketService {
  async generate(cart, req) {
    const { amount, detailedItems } = await amountAndDetails(cart);

    const code = uuidv4();
    const date = new Date();
    const purchaser = req.user.email;

    const ticket = new TicketDto(code, date, detailedItems, amount, purchaser);

    return ticket;
  }

  async create(ticket) {
    return await ticketDao.create(ticket);
  }
}

module.exports = TicketService;
