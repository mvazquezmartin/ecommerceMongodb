const MessageAdapter = require("./msg.factory");
const Dao = require("../dao/dao.factory");
const ProductManagerRepository = require("./product.repository");
const MessageRepository = require("./message.repository");
const CartManagerRepository = require("./cart.repository");
const TicketManagerRepository = require("./ticket.repository");
const UserManagerRepository = require("./user.repository");
const ChatManagerRepository = require("./chat.repository");

const message = new MessageRepository(new MessageAdapter());

const productManager = new ProductManagerRepository(Dao.ProductManager);
const cartManager = new CartManagerRepository(Dao.CartManager);
const userManager = new UserManagerRepository(Dao.UserManager);
const ticketManager = new TicketManagerRepository(Dao.TicketManager);
const chatManager = new ChatManagerRepository(Dao.ChatManager);

module.exports = {
  message,
  productManager,
  cartManager,
  userManager,
  ticketManager,
  chatManager,
};
