const { Router } = require("express");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");
const { message } = require("../repositories/index");
const productService = require("../service/product.service");
const productValidation = require("../utils/productValidation");
const ProductDto = require("../dtos/products.dto");

const router = Router();

//PRODUCTS BY PARAMS
router.get("/", async (req, res) => {
  try {
    const params = {
      category: req.query.category || null,
      priceMin: req.query.priceMin || null,
      priceMax: req.query.priceMax || null,
      sort: req.query.sort,
      page: req.query.page,
      limit: req.query.limit,
    };

    const response = await productService.filter(params);

    res.json({
      status: response.status,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    req.logger.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// PRODUCT BY ID
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    if (!(productValidation.validId(pid) || productValidation.validIdFs(pid))) {
      return res.status(400).json({
        status: "error",
        message: "The product ID is invalid",
        data: [],
      });
    }
    //productError.validId(pid);

    const response = await productService.getOneById(pid);

    //productError.status(response);

    res.status(200).json({
      status: response.status,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// NEW PRODUCT
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization(["admin", "premium"]),
  async (req, res) => {
    try {
      const user = req.user;
      const owner = user.role === "premium" ? user.email : "admin";

      const item = ProductDto.create(req.body, owner);

      if (productValidation.info(item))
        return res.status(400).json({
          status: "error",
          message: "All fields are required",
          data: [],
        });
      //productError.info(item);

      const response = await productService.create(item, user);

      res.status(201).json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      req.logger.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }
);

// UPDATE PRODUCT
router.patch(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorization(["admin", "premium"]),
  async (req, res) => {
    try {
      const { pid } = req.params;
      const user = req.user;

      if (!(productValidation.validId(pid) || productValidation.validIdFs(pid))) {
        return res.status(400).json({
          status: "error",
          message: "The product ID is invalid",
          data: [],
        });
      }
      //productError.validId(pid);

      if (user.role !== "admin") {
        const product = await productService.getOneById(pid);
        if (product.data.owner !== user.email)
          return res.status(400).json({
            status: "error",
            message: "You are not authorized to modify this product",
            data: [],
          });
      }
      // if (user.role === "premium") {
      //   await productError.owner(pid, user);
      // }

      const update = ProductDto.update(req.body);

      const response = await productService.update(pid, update);

      res.status(201).json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      req.logger.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
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
      const { pid } = req.params;
      const user = req.user;

      if (!(productValidation.validId(pid) || productValidation.validIdFs(pid))) {
        return res.status(400).json({
          status: "error",
          message: "The product ID is invalid",
          data: [],
        });
      }
      //productError.validId(pid);

      const product = await productService.getOneById(pid);

      if (product.status === "error") {
        return res.status(404).json({
          status: "error",
          message: "No product found",
          data: [],
        });
      }
      //productError.status(product);

      if (user.role !== "admin") {
        if (product.data.owner !== user.email) {
          return res.status(401).json({
            status: "error",
            message: "You are not authorized to remove this product",
            data: [],
          });
        }
        //await productError.owner(pid, user);
        const response = await productService.deleteOne(pid);
        return res.status(200).json({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      }

      if (user.role === "admin") {
        //await message.alertDelete(product.data);
      }

      const response = await productService.deleteOne(pid);

      res.status(200).json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      console.log(error)
      req.logger.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }
);

module.exports = router;

// ALL PRODUCTS
// router.get("/", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit);
//     const products = await productService.getAll();
//     if (!limit || isNaN(limit)) {
//       res.json(products);
//     } else {
//       res.json(products.slice(0, limit));
//     }
//   } catch (error) {
//     req.logger.error(error);
//     res.status(500).json({ message: "internal error server" });
//   }
// });

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
