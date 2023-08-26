const { v4: uuidv4 } = require("uuid");
const { ticketManager } = require("../repositories/index");
const amountAndDetails = require("../utils/ticketAmountDetails");
const TicketDto = require("../dtos/tickets.dto");
const cartService = require("../service/cart.service");

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
  await ticketManager.create(data);

  await cartService.update(cart._id, { products: [] });

  return {
    status: "success",
    message: "Ticket generated successfully",
    data: data,
  };
};

module.exports = { generate };
