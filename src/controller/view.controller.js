const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("home.handlebars");
});

router.get("/login", (req, res) => {
  res.render("login.handlebars");
});

router.get("/signup", (req, res) => {
  res.render("signup.handlebars");
});

router.get("/chat", (req, res) => {
  res.render("chat.handlebars");
});

router.get("/recoverypw", (req, res) => {
  res.render("recoverypw.handlebars");
});

module.exports = router;
