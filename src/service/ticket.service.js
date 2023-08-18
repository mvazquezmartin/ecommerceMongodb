const { v4: uuidv4 } = require("uuid");
const TicketsDao = require("../dao/mongoDb/manager/ticket.manager.mongo");
const TicketDto = require("../dtos/tickets.dto");
const amountAndDetails = require("../utils/ticketAmountDetails");

const ticketDao = new TicketsDao();

const generate = async (cart, user) => {
  const { amount, detailedItems } = await amountAndDetails(cart);

  const code = uuidv4();
  const date = new Date();
  const purchaser = user.email;

  const data = new TicketDto(code, date, detailedItems, amount, purchaser);

  return {status: "success", message:"Ticket generated successfully", data: data};
};

const create = async (ticket) => {
  return await ticketDao.create(ticket);
};

module.exports = { generate, create };
