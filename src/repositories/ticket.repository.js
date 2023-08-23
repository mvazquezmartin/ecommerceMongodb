class TicketManagerRepository {
  constructor(ticketManager) {
    this.ticketManager = ticketManager;
  }

  async create(ticket) {
    return await this.ticketManager.create(ticket);
  }
}

module.exports = TicketManagerRepository;
