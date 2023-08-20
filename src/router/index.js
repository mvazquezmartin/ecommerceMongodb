const producstController = require("../controller/products.controller");
const cartsController = require("../controller/cart.controller");
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const viewContoller = require("../controller/view.controller");
const swaggerController = require("../controller/swagger.controller");
const realtimeproductsController = require("../controller/realtimeproducts.controller");
const chatController = require("../controller/chat.controller");
const mockController = require("../controller/mock.controller");
// const homeController = require("../controller/home.controller");
// const signUpController = require("../controller/signup.controller");
// const loginController = require("../controller/login.controller");

const router = (app) => {
  app.use("/api/products", producstController);
  app.use("/api/cart", cartsController);
  app.use("/api/auth", authController);
  app.use("/api/user", userController);
  app.use("/", viewContoller);
  app.use("/apidocs", swaggerController);
  app.use("/realtimeproducts", realtimeproductsController);
  app.use("/chat", chatController);
  app.use("/mockingproducts", mockController);
};

// AGREGAR VIEWCONTROLLER

// product.controller byParams y getAll en un solo endpoints
// revisar y crear DTO
// crear view para changePw y funcion changepw
// implementar logger con customErrors
// factory local, para que funcione con fileSystem cart,user,ticket
// revisar chat con authorization
// hacer el front
// crear README
module.exports = router;
