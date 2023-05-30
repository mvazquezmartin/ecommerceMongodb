const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("singUp.handlebars");
});

module.exports = router;