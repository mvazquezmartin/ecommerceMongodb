const { Router } = require("express");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");
const ProductDto = require("../dtos/products.dto");
const productService = require("../service/product.service");
const {
  productInfoError,
  productValidIdError,
  productStatusError,
  productOwnerError,
} = require("../errorHandlers/product/prod.error");

const router = Router();

//PRODUCTS BY PARAMS
router.get("/params", async (req, res) => {
  try {
    const params = {
      category: req.query.category || null,
      priceMin: parseInt(req.query.priceMin),
      priceMax: parseInt(req.query.priceMax),
      sort: req.query.sort || null,
      page: parseInt(req.query.page),
      limit: parseInt(req.query.limit),
    };

    const result = await productService.filter(params);

    if (result.totalDocs === 0)
      return res.json({
        status: "Not found",
        message: "No product found",
      });

    const mapDto = result.docs.map((doc) => new ProductDto(doc));
    result.docs = mapDto;

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
router.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;

    productValidIdError(pid);

    const response = await productService.getOneById(pid);

    productStatusError(response);

    res.status(200).json({
      status: response.status,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

// NEW PRODUCT
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization(["admin", "premium"]),
  async (req, res, next) => {
    try {
      const user = req.user;
      const owner = user.role === "premium" ? user.email : "admin";

      const item = ProductDto.create(req.body, owner);

      productInfoError(item);

      const response = await productService.create(item);

      res.status(201).json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE PRODUCT
router.patch(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorization(["admin", "premium"]),
  async (req, res, next) => {
    try {
      const { pid } = req.params;
      const user = req.user;

      productValidIdError(pid);

      if (user.role === "premium") {
        await productOwnerError(pid, user);
      }

      const update = ProductDto.update(req.body);
      productInfoError(update);

      const response = await productService.update(pid, update);

      res.status(201).json({
        status: response.status,
        message: response.messages,
        data: response.data,
      });
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
  async (req, res, next) => {
    try {
      const { pid } = req.params;
      const user = req.user;

      productValidIdError(pid);

      if (user.role === "premium") {
        const product = await productService.getOneById(pid);
        productStatusError(product);
        await productOwnerError(pid, user);
      }

      const response = await productService.deleteOne(pid);

      res.json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
);

// STATUS TRUE
// router.put(
//   "/status",
//   passport.authenticate("jwt", { session: false }),
//   authorization("admin"),
//   async (req, res) => {
//     await productManager.status();
//     res.json({ message: "status true" });
//   }
// );

module.exports = router;
