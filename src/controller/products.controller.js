const { Router } = require("express");
const passport = require("passport");
const ProductManager = require("../dao/fileSystem/manager/product.manager.fs");
const { isValidObjectId } = require("mongoose");
const authorization = require("../middlewares/authorization.middleware");
const ProductService = require("../service/product.service");
const ProductDto = require("../dtos/products.dto");
const productError = require("../errorHandlers/product/prod.error");
const userService = require("../service/users.service");

const router = Router();
const productManager = new ProductManager();
const productService = new ProductService();

//PRODUCTS BY PARAMS
router.get("/params", async (req, res) => {
  try {
    const params = {
      category: req.query.category,
      priceMin: parseInt(req.query.priceMin),
      priceMax: parseInt(req.query.priceMax),
      sort: req.query.sort,
      page: parseInt(req.query.page),
      limit: parseInt(req.query.limit),
    };

    const result = await productService.filter(params);

    if (result.totalDocs === 0)
      return res.json({
        status: "Not found",
        message: "No product found",
      });

    const mapDto = result.docs.map(doc => new ProductDto(doc))
    result.docs = mapDto

    res.json({ status: "success", data: result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
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
    res.status(500).json({ message: "internal error server" });
  }
});

// PRODUCT BY ID
router.get("/:pid", async (req, res) => {
  try {
    const { id } = req.params.pid;

    if (!isValidObjectId(id)) throw new Error("ID invalido");

    const product = await productService.getOneById(id);

    if (!product) {
      res.json({ status: "Not found", message: "No se encuentra el producto" });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ status: "error", message: "Something went wrong" });
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

      const user = req.user;

      const product = await productService.create(item);

      if (user.role == "premium") {
        await userService.createOwn(user.email, product._id);
      }
      res
        .status(201)
        .json({ status: "succes", message: "Product added successfully" });
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
      const user = req.user;

      if (user.role == "premium") {
        const isOwn = await userService.checkOwn(user.email, id);
        if (!isOwn) throw new Error("Unauthorized");
      }

      const update = new ProductDto(req.body);
      productError(update);

      await productService.update(id, update);

      res.status(201).json({ success: "Producto modificado exitosamente" });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE BY ID
router.delete(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorization(["admin", "premium"]),
  async (req, res) => {
    try {
      const id = req.params.pid;
      const user = req.user;

      if (user.role == "premium") {
        const isOwn = await userService.checkOwn(user.email, id);
        if (!isOwn) throw new Error("Unauthorized");
      }

      await productService.delete(id);

      res.json({ message: "Producto eliminado" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Unauthorized" });
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
