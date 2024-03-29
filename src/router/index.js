const producstController = require("../controller/products.controller");
const cartsController = require("../controller/cart.controller");
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const viewContoller = require("../controller/view.controller");
const swaggerController = require("../controller/swagger.controller");
const realtimeproductsController = require("../controller/realtimeproducts.controller");
const mockController = require("../controller/mock.controller");

const router = (app) => {
  app.use("/api/products", producstController);
  app.use("/api/carts", cartsController);
  app.use("/api/auths", authController);
  app.use("/api/users", userController);
  app.use("/", viewContoller);
  app.use("/apidocs", swaggerController);
  app.use("/realtimeproducts", realtimeproductsController);
  app.use("/mockingproducts", mockController);
  app.use("*", (req, res) => {
    res.status(404).render("notfound.handlebars");
  });
};

module.exports = router;
