const { Router } = require("express");
const router = Router();
const ProductManager = require("../src/productManager");

const productManager = new ProductManager();

// ALL PRODUCTS
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts();
  if (!limit || isNaN(limit)) {
    res.json(products);
  } else {
    res.json(products.slice(0, limit));
  }
});

// PRODUCT BY ID
router.get("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productManager.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    res.send('<img src="https://http.cat/404">');
  }
});

// NEW PRODUCT
router.post("/", async (req, res) => {
  const item = req.body;
  try {
    await productManager.addProduct(item);
    res.status(201).send("Producto agregado");
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE PRODUCT
router.put("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const  update  = req.body;
  try {
    await productManager.updateProduct(id, update);
    res.status(201).send("Producto modificado exitosamente");
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE BY ID
router.delete("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  try {
    await productManager.deleteProduct(id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('<img src="https://http.cat/500">');
  }
});

// STATUS TRUE 
router.put("/status", async(req, res) =>{
  await productManager.status()
  res.json({ message: "status true" })
})

module.exports = router;
