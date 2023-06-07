const { Router } = require("express");
const MessagesDao = require("../dao/chat.dao");

const router = Router();
const message = new MessagesDao();

router.get("/", (req, res) => {
  res.render("chat.handlebars");
});

router.post("/", async (req, res) => {
  try {
    const msj = req.body;
    await message.create(msj);
    res.json(msj);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

module.exports = router;
