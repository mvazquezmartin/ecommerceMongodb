const { Router } = require("express");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");
const CartService = require("../service/cart.service");
const ProductService = require("../service/product.service");

const router = Router();
const cartService = new CartService();
const productService = new ProductService();

// GET ALL CARTS
router.get("/", async (req, res) => {
  const carts = await cartService.get();
  if (carts.length === 0) {
    res.json({ message: "No hay carritos" });
  } else {
    res.json(carts);
  }
});

// NEW CART
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  async (req, res) => {
    try {
      const newCart = await cartService.create();
      console.log(newCart);
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
    const id = parseInt(req.params.cid);
    const cartFind = await cartService.getOne(id);

    if (!cartFind) res.status(404).json({ error: "Carrito no encontrado" });

    if (cartFind.products.length !== 0) {
      res.json(cartFind.products);
    } else {
      res.status(404).json({ error: "El carrito no tiene productos" });
    }
  }
);

// ADD ITEM CART
router.post(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
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
