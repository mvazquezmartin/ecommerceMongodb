class ProductDto {
  constructor(item) {
    this.id = item._id
    this.title = item.title;
    this.description = item.description;
    this.category = item.category;
    this.code = item.code;
    this.stock = item.stock;
    this.price = item.price;
    this.thumbnail = item.thumbnail;
    this.owner = item.owner;
  }

  static create(item, owner) {
    const dto = new ProductDto({ ...item, owner: owner });
    return dto;
  }

  static update(item) {
    const dto = new ProductDto(item);
    delete dto.owner;
    return dto;
  }
}

module.exports = ProductDto;
