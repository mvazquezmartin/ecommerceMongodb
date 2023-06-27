const TicketsDao = require("../dao/ticket.dao");

class TickerService {
  async create(date, amount, purcharser) {
    return await TicketsDao.create(date, amount, purcharser);
  }
}

module.exports = TickerService;
