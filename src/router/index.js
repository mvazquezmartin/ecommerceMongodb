const producstController = require("../controller/products.controller");
const cartsController = require("../controller/cart.controller");
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const viewContoller = require("../controller/view.controller");
const swaggerController = require("../controller/swagger.controller");
const realtimeproductsController = require("../controller/realtimeproducts.controller");
const chatController = require("../controller/chat.controller");
const mockController = require("../controller/mock.controller");

const router = (app) => {
  app.use("/api/products", producstController);
  app.use("/api/carts", cartsController);
  app.use("/api/auths", authController);
  app.use("/api/users", userController);
  app.use("/", viewContoller);
  app.use("/apidocs", swaggerController);
  app.use("/realtimeproducts", realtimeproductsController);
  app.use("/chat", chatController);
  app.use("/mockingproducts", mockController);
};

// crear view para changePw y funcion changepw
// factory local, para que funcione con fileSystem cart,user,ticket
// revisar chat con authorization
// hacer el front
// crear README
module.exports = router;
