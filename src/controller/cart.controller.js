const { Router } = require("express");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");
const cartService = require("../service/cart.service");
const productService = require("../service/product.service");
const ticketService = require("../service/ticket.service");
const productError = require("../errorHandlers/product/prod.error");
const cartError = require("../errorHandlers/cart/cart.error");

const router = Router();

// GET ALL CARTS
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  async (req, res) => {
    try {
      const response = await cartService.getAll();
      res.json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// NEW CART
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  async (req, res) => {
    try {
      const response = await cartService.create();
      res.status(201).json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

//CART BY ID
router.get(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "premium", "admin"]),
  async (req, res, next) => {
    try {
      const { cid } = req.params;

      cartError.validId(cid);

      const response = await cartService.getOneById(cid);

      cartError.status(response);

      res.json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
);

// ADD ITEM CART
router.post(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "premium"]),
  async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const user = req.user;

      productError.validId(pid);
      //cartError.validId(cid);

      const cartData = await cartService.getOneById(cid);
      cartError.status(cartData);

      await cartError.owner(cid, user);

      if (user.role == "premium") {
        await productError.owner(pid, user);
      }

      const product = await productService.getOneById(pid);

      productError.status(product);
      cartError.quantity(quantity);
      await productError.checkStock(pid, quantity);

      const response = await cartService.addProduct(cid, pid, quantity);

      res.json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      req.logger.error(error.message);
      next(error);
    }
  }
);

//DELETE ITEM CART
router.delete(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "premium"]),
  async (req, res, next) => {
    try {
      const { cid, pid } = req.params;

      cartError.validId(cid);
      productError.validId(pid);

      const cartData = await cartService.getOneById(cid);
      cartError.status(cartData);

      const user = req.user;
      await cartError.owner(cid, user);

      const response = await cartService.deleteProduct(cid, pid);

      res.status(200).json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
);

//GENERATE AND CREATE TICKET
router.get(
  "/:cid/purchase",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "premium"]),
  async (req, res) => {
    try {
      const { cid } = req.params;
      const user = req.user;

      const cart = await cartService.getOneById(cid);

      if (cart.data.length === 0)
        return res
          .status(401)
          .send({ status: cart.status, message: cart.message, data: [] });

      const response = await ticketService.generate(cart.data, user);

      res.status(200).json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      req.logger.error(error);
      res.status(400).json("algo salio mal");
    }
  }
);

// DELETE ALL CARTS
router.delete("/", async (req, res) => {
  await cartService.delete();
  res.json({ message: "Carritos ELIMINADOS!" });
});
module.exports = router;

// //PURCHASE
// router.get(
//   "/:cid/purchase",
//   passport.authenticate("jwt", { session: false }),
//   authorization("user"),
//   async (req, res) => {
//     try {
//       let amount = 0;

//       const { cid } = req.params;
//       const { limit = 1, page = 1 } = req.query;

//       const cart = await cartService.getOne(cid, limit, page);
//       if (!cart) return res.status(401).send({ status: "error", error: cart });

//       await cart.populate("products.product");

//       for (const item of cart.products) {
//         const prod = item.product;
//         const price = prod.price;
//         const quantity = item.quantity;

//         amount += price * quantity;

//         await productService.checkStock(prod._id, quantity);
//         const updateStock = prod.stock - quantity;
//         await productService.update(prod._id, { stock: updateStock });
//       }

//       const date = new Date().toLocaleDateString();
//       const code = uuidv4();

//       const ticket = {
//         code,
//         date,
//         amount,
//         purchaser: "prueba",
//       };

//       await ticketService.create(ticket);

//       res.status(200).json(ticket);
//     } catch (error) {
//       console.log("errorrrr");
//       res.status(400).json(error);
//     }
//   }
// );
