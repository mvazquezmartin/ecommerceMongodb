const realtimeproductsController = require("../controller/realtimeproducts.controller");
const cartController = require("../controller/cart.controller");
const productController = require("../controller/products.controller");
const homeController = require("../controller/home.controller");
const inputController = require("../controller/input.controller");
const chatController = require("../controller/chat.controller");
const userController = require("../controller/user.controller");
const singUpController = require("../controller/singup.controller");
const authController = require("../controller/auth.controller");
const loginController = require("../controller/login.controller");

const router = (app) => {
  app.use("/api/products", productController);
  app.use("/api/cart", cartController);
  app.use("/realtimeproducts", realtimeproductsController);
  app.use("/input", inputController);
  app.use("/home", homeController);
  app.use("/chat", chatController);
  app.use("/user", userController);
  app.use("/login", loginController);
  app.use("/singup", singUpController);
  app.use("/auth", authController);
};

module.exports = router;
