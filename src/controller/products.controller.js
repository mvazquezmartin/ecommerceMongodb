const { Router } = require("express");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");
const ProductDto = require("../dtos/products.dto");
const productService = require("../service/product.service");
const productError = require("../errorHandlers/product/prod.error");
const MailAdapter = require("../adapters/mail.adapter");

const router = Router();
const msg = new MailAdapter();

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
    req.logger.error(error.message);
    res.json({ status: "error", message: "Internal server error" });
  }
});

// PRODUCT BY ID
router.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;

    productError.validId(pid);

    const response = await productService.getOneById(pid);

    productError.status(response);

    res.status(200).json({
      status: response.status,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    req.logger.error(error.message);
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

      productError.info(item);

      const response = await productService.create(item, user);

      res.status(201).json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      req.logger.error(error.message);
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

      productError.validId(pid);

      if (user.role === "premium") {
        await productError.owner(pid, user);
      }

      const update = ProductDto.update(req.body);

      const response = await productService.update(pid, update);

      res.status(201).json({
        status: response.status,
        message: response.messages,
        data: response.data,
      });
    } catch (error) {
      req.logger.error(error.message);
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

      productError.validId(pid);
      const product = await productService.getOneById(pid);
      productError.status(product);

      if (user.role === "premium") {
        await productError.owner(pid, user);
        const response = await productService.deleteOne(pid);
        res.json({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      }

      if (user.role === "admin") {
        await msg.alertDelete(product.data);
        const response = await productService.deleteOne(pid);
        res.json({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      }
    } catch (error) {
      req.logger.error(error.message);
      next(error);
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
