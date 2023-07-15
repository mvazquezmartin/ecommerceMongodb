const { Router } = require("express");
const passport = require("passport");
const ProductManager = require("../dao/productManager");
const { isValidObjectId } = require("mongoose");
const authorization = require("../middlewares/authorization.middleware");
const ProductService = require("../service/product.service");
const ProductDto = require("../dtos/products.dto");
const productError = require("../errorHandlers/product/prod.error");

const router = Router();
const productManager = new ProductManager();
const productService = new ProductService();

//PRODUCTS BY PARAMS
router.get("/params", async (req, res) => {
  try {
    const params = req.body;
    const products = await productService.filter(params);
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
    const products = await productService.getAll();
    if (!limit || isNaN(limit)) {
      res.json(products);
    } else {
      res.json(products.slice(0, limit));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal error server" });
  }
});

// PRODUCT BY ID
router.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    if (!isValidObjectId(id)) throw new Error("ID invalido");
    const product = await productService.getOneById(id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "ID INVALIDO" });
  }
});

// NEW PRODUCT
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization(["admin", "premium"]),
  async (req, res, next) => {
    try {
      const item = new ProductDto(req.body);
      productError(item);
      await productService.create(item);
      res.status(201).send("Producto agregado");
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE PRODUCT
router.put(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorization(["admin", "premium"]),
  async (req, res, next) => {
    try {
      const id = req.params.pid;
      const update = new ProductDto(req.body);      
      productError(update);
      await productService.update(id, update);
      res.status(201).send("Producto modificado exitosamente");
    } catch (error) {
      next(error);
    }
  }
);

// DELETE BY ID
router.delete(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorization(["admin","premium"]),
  async (req, res) => {
    const id = req.params.pid;
    try {
      await productService.delete(id);
      res.json({ message: "Producto eliminado" });
    } catch (error) {
      console.error(error);
      res.status(500);
      res.send('<img src="https://http.cat/500">');
    }
  }
);

// STATUS TRUE
router.put(
  "/status",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  async (req, res) => {
    await productManager.status();
    res.json({ message: "status true" });
  }
);

module.exports = router;
