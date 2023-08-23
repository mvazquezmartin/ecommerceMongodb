require("colors");
const path = require("path");
const { environment } = require("../config/app.config");
const mongoConnect = require("../../db");

const fileProducts = path.join(__dirname, "./fileSystem/files/products.json");

switch (environment) {
  case "local":
    console.log("FileSystem persistence".bgGreen);

    const ProductManagerFs = require("./fileSystem/manager/product.manager.fs");

    module.exports = {
      ProductManager: new ProductManagerFs(fileProducts),
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
