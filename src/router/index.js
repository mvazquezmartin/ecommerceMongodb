const realtimeproductsController = require("../controller/realtimeproducts.controller");
const cartsController = require("../controller/cart.controller");
const producstController = require("../controller/products.controller");
const homeController = require("../controller/home.controller");
const chatController = require("../controller/chat.controller");
const userController = require("../controller/user.controller");
const signUpController = require("../controller/signup.controller");
const authController = require("../controller/auth.controller");
const loginController = require("../controller/login.controller");
const mockController = require("../controller/mock.controller");
const swaggerController = require("../controller/swagger.controller");

const router = (app) => {
  app.use("/api/products", producstController);
  app.use("/api/cart", cartsController);
  app.use("/realtimeproducts", realtimeproductsController);
  app.use("/home", homeController);
  app.use("/chat", chatController);
  app.use("/user", userController);
  app.use("/login", loginController);
  app.use("/signup", signUpController);
  app.use("/auth", authController);
  app.use("/mockingproducts", mockController);
  app.use("/apidocs", swaggerController);
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
