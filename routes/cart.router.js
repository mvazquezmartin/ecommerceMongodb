const { Router } = require("express");
const router = Router();
const Cart = require("../src/cart");
const file = "../file/cart.json";
const cart = new Cart(file);

// NEW CART
router.post("/", async (req, res) => {
  try {
    const newCart = await cart.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PRODUCT CART BY ID
router.get("/:cid", async (req, res) => {
  const id = parseInt(req.params.cid);
  const cartFind = await cart.getCartById(id);
  if (cartFind) {
    res.json(cartFind.products);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

// ADD ITEM CART
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  if (!quantity) {
    return res.status(400).json({ error: "Falta especificar la cantidad" });
  }
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
});
module.exports = router;
