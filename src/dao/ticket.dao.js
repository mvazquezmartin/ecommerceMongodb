const Tickets = require("./models/ticket.model")

class TicketsDao{
  async create(ticketData){
    return await Tickets.create(ticketData)
  }

  async getOneById(id){
    return await Tickets.findById(id)
  }
}

module.exports = TicketsDao