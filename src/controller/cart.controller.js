const { Router } = require("express");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");
const cartService = require("../service/cart.service");
const productService = require("../service/product.service");
const {
  productOwnerError,
  productValidIdError,
  productCheckStockError,
  productStatusError,
} = require("../errorHandlers/product/prod.error");
const {
  cartValidIdError,
  cartStatusError,
  cartQuantityError,
  cartOwnerError,
} = require("../errorHandlers/cart/cart.error");

const router = Router();

// GET ALL CARTS
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  async (req, res) => {
    const carts = await cartService.getAll();
    if (carts.length === 0) {
      res.json({ message: "No hay carritos" });
    } else {
      res.json(carts);
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
      const newCart = await cartService.create();

      res.status(201).json(newCart);
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

      cartValidIdError(cid);

      const response = await cartService.getOneById(cid);

      cartStatusError(response);

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

      productValidIdError(pid);
      cartValidIdError(cid);

      const cartData = await cartService.getOneById(cid);
      cartStatusError(cartData);

      await cartOwnerError(cid, user);

      if (user.role == "premium") {
        await productOwnerError(pid, user);
      }

      const product = await productService.getOneById(pid);

      productStatusError(product);
      cartQuantityError(quantity);
      await productCheckStockError(pid, quantity);

      const response = await cartService.addProduct(cid, pid, quantity);      

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

//DELETE ITEM CART
router.delete(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "premium"]),
  async (req, res, next) => {
    try {
      const { cid, pid } = req.params;

      cartValidIdError(cid);
      productValidIdError(pid);

      const cartData = await cartService.getOneById(cid);
      cartStatusError(cartData);

      const user = req.user;
      await cartOwnerError(cid, user);

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
