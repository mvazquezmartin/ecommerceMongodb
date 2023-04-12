const realtimeproductsController = require("../templates/controller.realtimeproducts");
const cartController = require("../templates/controller.cart");
const productController = require("../templates/controller.products");
const homeController = require("../templates/controller.home");
const inputController = require("../templates/controller.input");
const chatController = require("../templates/controller.chat");

const router = (app) => {
  app.use("/api/products", productController);
  app.use("/api/cart", cartController);
  app.use("/realtimeproducts", realtimeproductsController);
  app.use("/input", inputController);
  app.use("/home", homeController);
  app.use("/chat", chatController);
};

module.exports = router;
