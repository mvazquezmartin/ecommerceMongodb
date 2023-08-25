const { Router } = require("express");
const router = Router();
const productService = require("../service/product.service");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");

router.get("/", async (req, res) => {
  try {
    let user = null;
    if (req.isAuthenticated()) {
      user = req.user;
    }

    const params = {
      category: req.query.category || null,
      priceMin: req.query.priceMin || null,
      priceMax: req.query.priceMax || null,
      sort: req.query.sort,
      page: req.query.page,
      limit: req.query.limit,
    };
    const products = [];
    console.log(user);

    const data = await productService.filter(params);
    products.push(...data.data.docs);

    res.render("home.handlebars", {
      title: "Home",
      products,
      hasPrevPage: data.data.hasPrevPage,
      hasNextPage: data.data.hasNextPage,
      prevPageLink: data.data.prevPageLink,
      nextPageLink: data.data.nextPageLink,
    });
  } catch (error) {
    throw error;
  }
});

router.get("/login", (req, res) => {
  res.render("login.handlebars", { title: "LogIn" });
});

router.get("/signup", (req, res) => {
  res.render("signup.handlebars", { title: "SignUp" });
});

router.get(
  "/chat",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "premium", "admin"]),
  (req, res) => {
    try {
      const user = req.user;
      res.render("chat.handlebars", { title: "Chat", user });
    } catch (error) {
      throw error;
    }
  }
);

router.get("/recoverypw", (req, res) => {
  res.render("recoverypw.handlebars", { title: "Password Recovery" });
});

module.exports = router;
