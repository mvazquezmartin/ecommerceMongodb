require("colors");
const path = require("path");
const mongoConnect = require("../../db");
const { environment } = require("../config/app.config");

const fileProducts = path.join(__dirname, "./fileSystem/files/products.json");

let productDAO;
let userDAO;

switch (environment) {
  case "local":
    const ProductManagerFs = require("./fileSystem/manager/product.manager.fs");
    productDAO = new ProductManagerFs(fileProducts);
    console.log("FileSystem persistence".bgGreen);
    break;

  case "development":
    mongoConnect();
    const ProductManagerMongo = require("./mongoDb/manager/product.manager.mongo");
    productDAO = new ProductManagerMongo();
    const UserManagerMongo = require("./mongoDb/manager/users.manager.mongo");
    userDAO = new UserManagerMongo();
    break;

  default:
    throw new Error("environment error", environment);
}

module.exports = { productDAO, userDAO };
