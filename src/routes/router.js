const realtimeproductsController = require("../templates/controller.realtimeproducts");
const cartController = require("../templates/controller.cart");
const productController = require("../templates/controller.products");
const homeController = require("../templates/controller.home");
const inputController = require("../templates/controller.input");
const chatController = require("../templates/controller.chat");
const userController = require("../templates/controller.user");
const singUpController = require("../templates/controller.singUp")
const authController = require("../templates/controller.auth");

const router = (app) => {
  app.use("/api/products", productController);
  app.use("/api/cart", cartController);
  app.use("/realtimeproducts", realtimeproductsController);
  app.use("/input", inputController);
  app.use("/home", homeController);
  app.use("/chat", chatController);
  app.use("/user", userController);
  app.use("/singup", singUpController)
  app.use("/auth", authController);
};

module.exports = router;
