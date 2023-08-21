const { v4: uuidv4 } = require("uuid");
const TicketsDao = require("../dao/mongoDb/manager/ticket.manager.mongo");
const TicketDto = require("../dtos/tickets.dto");
const amountAndDetails = require("../utils/ticketAmountDetails");
const cartService = require("../service/cart.service");

const ticketDao = new TicketsDao();

const generate = async (cart, user) => {
  const dataDetails = await amountAndDetails(cart);

  if (dataDetails.status === "error")
    return {
      status: dataDetails.status,
      message: dataDetails.message,
      data: dataDetails.data,
    };

  const code = uuidv4();
  const date = new Date();
  const purchaser = user.email;

  const ticketData = {
    code,
    date,
    purchaser,
    detailedItems: dataDetails.data.details,
    amount: dataDetails.data.amount,
  };

  const data = new TicketDto(ticketData);

  await ticketDao.create(data);

  await cartService.update(cart, { products: [] });

  return {
    status: "success",
    message: "Ticket generated successfully",
    data: data,
  };
};

module.exports = { generate };
