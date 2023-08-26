require("colors");
const path = require("path");
const { environment } = require("../config/app.config");
const mongoConnect = require("../../db");

const fileProducts = path.join(__dirname, "./fileSystem/files/products.json");
const fileCarts = path.join(__dirname, "./fileSystem/files/carts.json");
const fileUsers = path.join(__dirname, "./fileSystem/files/users.json");
const fileTickets = path.join(__dirname, "./fileSystem/files/tickets.json");
const fileChats = path.join(__dirname, "./fileSystem/filles/chat.json");

switch (environment) {
  case "local":
    console.log("FileSystem persistence".bgGreen);

    const ProductManagerFs = require("./fileSystem/manager/product.manager.fs");
    const CartsManagerFs = require("./fileSystem/manager/cart.manager.fs");
    const UserManagerFs = require("./fileSystem/manager/user.manager.fs");
    const TicketsManagerFs = require("./fileSystem/manager/ticket.manager.fs");
    const ChatManagerFs = require("./fileSystem/manager/chat.manager.fs");

    module.exports = {
      ProductManager: new ProductManagerFs(fileProducts),
      CartManager: new CartsManagerFs(fileCarts),
      UserManager: new UserManagerFs(fileUsers),
      TicketManager: new TicketsManagerFs(fileTickets),
      ChatManager: new ChatManagerFs(fileChats),
    };

    break;

  case "development":
    mongoConnect();

    const ProductManagerMongo = require("./mongoDb/manager/product.manager.mongo");
    const CartManagerMongo = require("./mongoDb/manager/cart.manager.mongo");
    const UserManagerMongo = require("./mongoDb/manager/users.manager.mongo");
    const TicketManagerMongo = require("./mongoDb/manager/ticket.manager.mongo");
    const ChatManagerMongo = require("./mongoDb/manager/chat.manager.mongo");

    module.exports = {
      ProductManager: new ProductManagerMongo(),
      CartManager: new CartManagerMongo(),
      UserManager: new UserManagerMongo(),
      TicketManager: new TicketManagerMongo(),
      ChatManager: new ChatManagerMongo(),
    };

    break;

  default:
    throw new Error("environment error", environment);
}
