const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("signup.handlebars");
});

module.exports = router;