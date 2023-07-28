class ProductDto {
  constructor(item) {
    this._id = item._id;
    this.title = item.title;
    this.description = item.description;
    this.price = item.price;
    this.category = item.category;
    this.code = item.code;
    this.stock = item.stock;
    this.thumbnail = item.thumbnail;
    this.owner = item.owner;
  }
}

module.exports = ProductDto;
