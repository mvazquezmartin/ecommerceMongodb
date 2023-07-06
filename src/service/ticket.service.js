const { v4: uuidv4 } = require("uuid");
const TicketsDao = require("../dao/ticket.dao");
const ProductService = require("./product.service");

const ticketDao = new TicketsDao();
const productService = new ProductService();

class TicketService {
  async generate(cart, req) {
    let amount = 0;

    await cart.populate("products.product");

    for (const item of cart.products) {
      const prod = item.product;
      const price = prod.price;
      const quantity = item.quantity;

      amount += price * quantity;

      await productService.checkStock(prod._id, quantity);
      const updateStock = prod.stock - quantity;
      await productService.update(prod._id, { stock: updateStock });
    }

    const date = new Date().toLocaleDateString();
    const code = uuidv4();
    const purchaser = req.user.email;

    const ticket = {
      code,
      date,
      amount,
      purchaser,
    };

    return ticket;
  }

  async create(ticket) {
    return await ticketDao.create(ticket);
  }
}

module.exports = TicketService;
