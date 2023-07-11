class TicketDto {
  constructor(code, date, detailedItems, amount, purchaser) {
    this.code = code;
    this.date = date;
    this.detailedItems = detailedItems;
    this.amount = amount;
    this.purchaser = purchaser;
  }
}

module.exports = TicketDto;
