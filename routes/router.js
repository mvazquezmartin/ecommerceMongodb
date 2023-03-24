const realtimeproductsController = require("../templates/controller.realtimeproducts");
const cartController = require("../templates/constroller.cart");
const productController = require("../templates/controller.products");
const homeController = require("../templates/controller.home");
const inputController = require("../templates/controller.input");

const router = (app) => {
  app.use("/api/products", productController);
  app.use("/api/cart", cartController);
  app.use("/realtimeproducts", realtimeproductsController);
  app.use("/input", inputController);
  app.use("/home", homeController);
};

module.exports = router;
