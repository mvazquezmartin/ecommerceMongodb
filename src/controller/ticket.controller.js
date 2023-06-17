const { Router } = require("express");
const ticketService = require("../service/ticket.service");

const router = Router();

router.get("/:tid", async (res, req) => {
  try {
    const ticket = await ticketService.create(req.body);

    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await ticketService.getOneById(id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
