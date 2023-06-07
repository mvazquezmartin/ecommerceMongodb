const { Router } = require("express");
const router = Router();
const ProductManager = require("../dao/productManager");
const ProductDao = require("../dao/product.dao");
const { isValidObjectId } = require("mongoose");

const productManager = new ProductManager();
const productDao = new ProductDao();

//PRODUCTS BY PARAMS
router.get("/params", async (req, res) => {
  try {
    const params = req.body;
    const products = await productDao.filter(params);
    if (products.length === 0)
      return res.json({ message: "No se encontro producto" });
    res.json(products);
  } catch (error) {
    res.json({ message: error });
  }
});

// ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    //const products = await productManager.getProducts();
    //await productDao.addManyDb(products)
    const products = await productDao.getAll();
    if (!limit || isNaN(limit)) {
      res.json(products);
    } else {
      res.json(products.slice(0, limit));
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal error server" });
  }
});
//   const limit = parseInt(req.query.limit);
//   //const products = await productManager.getProducts();
//   //await productDao.addManyDb(products)
//   const products = await productDao.getProductsDb();
//   if (!limit || isNaN(limit)) {
//     res.json(products);
//   } else {
//     res.json(products.slice(0, limit));
//   }
// });

// PRODUCT BY ID
router.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    //const product = await productManager.getProductById(id);
    if (!isValidObjectId(id)) throw new Error("ID invalido");
    const product = await productDao.getOneById(id);
    res.json(product);
  } catch (error) {
    console.log("entro al error");
    console.log(error);
    res.status(404).send({ message: "ID INVALIDO" });
  }
});

// NEW PRODUCT
router.post("/", async (req, res) => {
  const item = req.body;
  try {
    //await productManager.addProduct(item);
    await productDao.create(item);
    res.status(201).send("Producto agregado");
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE PRODUCT
router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const update = req.body;
  try {
    //await productManager.updateProduct(id, update);
    await productDao.update(id, update);
    res.status(201).send("Producto modificado exitosamente");
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE BY ID
router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  try {
    //await productManager.deleteProduct(id);
    await productDao.delete(id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('<img src="https://http.cat/500">');
  }
});

// STATUS TRUE
router.put("/status", async (req, res) => {
  await productManager.status();
  res.json({ message: "status true" });
});

module.exports = router;
