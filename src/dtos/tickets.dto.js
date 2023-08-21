class TicketDto {
  constructor(ticketInfo) {
    this.code = ticketInfo.code;
    this.date = ticketInfo.date;
    this.detailedItems = ticketInfo.detailedItems;
    this.amount = ticketInfo.amount;
    this.purchaser = ticketInfo.purchaser;
  }
}

module.exports = TicketDto;
