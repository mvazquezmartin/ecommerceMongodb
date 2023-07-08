class TicketDto {
  constructor(code, date, amount, purchaser) {
    this.code = code;
    this.date = date;
    this.amount = amount;
    this.purchaser = purchaser;
  }
}

module.exports = TicketDto;
