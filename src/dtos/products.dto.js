class ProductDto {
  constructor(item) {
    this.title = item.title;
    this.description = item.description;
    this.price = item.price;
    this.category = item.category;
    this.code = item.code;
    this.stock = item.stock;
    this.thumbnail = item.thumbnail;
  }
}

module.exports = ProductDto;
