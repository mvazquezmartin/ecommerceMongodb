const { Router } = require("express");
const router = Router();
const Cart = require("../dao/cart");
const ProductManager = require("../dao/productManager");
const file = "./file/cart.json";
const fileProd = "./file/productos.json";
const cart = new Cart(file);
const productManager = new ProductManager(fileProd);

// GET ALL CARTS
router.get("/", async (req, res) => {
  const carts = await cart.getCarts();
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
  authorization("admin"),
  async (req, res) => {
    try {
      const newCart = await cart.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// PRODUCT CART BY ID
router.get(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  async (req, res) => {
    const id = parseInt(req.params.cid);
    const cartFind = await cart.getCartById(id);
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
    const product = await productManager.getProductById(parseInt(pid));
    if (!product)
      return res.status(400).json({ error: "No se encuentra el producto" });
    const { quantity } = req.body;
    if (!quantity) {
      return res.status(400).json({ error: "Falta especificar la cantidad" });
    }
    await productManager.reduceStock(parseInt(pid), quantity);
    const cartAdd = await cart.addProductCart(
      parseInt(cid),
      parseInt(pid),
      quantity
    );
    if (cartAdd) {
      res.json(cartAdd);
    } else {
      res.status(404).json({ error: "Carrito o producto no encontrado" });
    }
  }
);

// DELETE ALL CARTS
router.delete("/", async (req, res) => {
  await cart.deleteAllCarts();
  res.json({ message: "Carritos ELIMINADOS!" });
});
module.exports = router;
