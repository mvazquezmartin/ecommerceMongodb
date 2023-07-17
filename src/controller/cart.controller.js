const { Router } = require("express");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");
const CartService = require("../service/cart.service");
const ProductService = require("../service/product.service");
const userService = require("../service/users.service");

const router = Router();
const cartService = new CartService();
const productService = new ProductService();

// GET ALL CARTS
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  async (req, res) => {
    const carts = await cartService.get();
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
  authorization("user"),
  async (req, res) => {
    try {
      const { cid } = req.params;

      const cart = await cartService.getOne(cid);

      res.json(cart);
    } catch (error) {
      res.status(404).json({ error: "El carrito no tiene productos" });
    }
  }
);

// ADD ITEM CART
router.post(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "premium"]),
  async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      const user = req.user;

      if (user.role == "premium") {
        const isOwn = await userService.checkOwn(user.email, pid);
        if (isOwn) throw new Error("Unauthorized");
      }

      const product = await productService.getOneById(pid);

      if (!product) {
        return res.status(400).json({ error: "No se encuentra el producto" });
      }
      if (!quantity) {
        return res.status(400).json({ error: "Falta especificar la cantidad" });
      }

      await productService.checkStock(pid, quantity);

      const cartAdd = await cartService.addProduct(cid, pid, quantity);

      if (cartAdd) {
        res.json(cartAdd);
      } else {
        res.status(404).json({ error: "Carrito o producto no encontrado" });
      }
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
);

//DELETE ITEM CART
router.delete(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "premium"]),
  async (req, res) => {
    try {
      const { cid, pid } = req.params;

      await cartService.deleteProduct(cid, pid);

      res.status(200).json({ message: "Producto elimiando del carrito" });
    } catch {
      console.log(error);
      res.json({ error: "algo salio mal" });
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
