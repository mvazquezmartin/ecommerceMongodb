const realtimeproductsController = require("../templates/controller.realtimeproducts");
const cartController = require("../templates/constroller.cart");
const productController = require("../templates/controller.products");
const homeController = require("../templates/controller.home");

const router = (app) => {
  app.use("/api/products", productController);
  app.use("/api/cart", cartController);
  app.use("/realtimeproducts", realtimeproductsController);
  app.use("/home", homeController)
};

module.exports = router;
