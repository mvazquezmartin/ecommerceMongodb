const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");
const ProductService = require("../service/product.service");
const CartService = require("../service/cart.service");
const TicketService = require("../service/ticket.service");

const router = Router();
const productService = new ProductService();
const cartService = new CartService();
const ticketService = new TicketService();

router.get(
  "/:cid/purchase",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  async (req, res) => {
    try {
      let amount = 0;

      const { cid } = req.params;
      const { limit = 1, page = 1 } = req.query;

      const cart = await cartService.getOne(cid, limit, page);
      if (!cart) return res.status(401).send({ status: "error", error: cart });

      await cart.populate("products.product");

      for (const item of cart.products) {
        const prod = item.product;
        const price = prod.price;
        const quantity = item.quantity;

        amount += price * quantity;

        await productService.checkStock(prod._id, quantity);
        const updateStock = prod.stock - quantity;
        await productService.update(prod._id, { stock: updateStock });
      }

      const date = new Date().toLocaleDateString();
      const code = uuidv4();
      const purchaser = req.user.email;

      const ticket = {
        code,
        date,
        amount,
        purchaser,
      };

      await ticketService.create(ticket);

      res.status(200).json(ticket);
    } catch (error) {
      console.log("errorrrr");
      res.status(400).json(error);
    }
  }
);

module.exports = router;
