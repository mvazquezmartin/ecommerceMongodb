const { Router } = require("express");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");
const CartService = require("../service/cart.service");
const TicketService = require("../service/ticket.service");

const router = Router();
const cartService = new CartService();
const ticketService = new TicketService();

router.get(
  "/:cid/purchase",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  async (req, res) => {
    try {
      const { cid } = req.params;
      const { limit = 1, page = 1 } = req.query;

      const cart = await cartService.getOne(cid, limit, page);
      if (!cart) return res.status(401).send({ status: "error", error: cart });

      const ticket = await ticketService.generate(cart, req);

      await ticketService.create(ticket);

      res.status(200).json(ticket);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

module.exports = router;
