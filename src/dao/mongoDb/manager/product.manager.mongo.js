const Products = require("../models/products.model");

class ProductManager {
  async getAll() {
    return await Products.find({ status: true });
  }

  async filter(params) {
    return await Products.filterProducts(params);
  }

  async create(item) {
    return await Products.create(item);
  }

  async getOneById(id) {
    return await Products.findOne({ _id: id, status: true });
  }

  async update(id, update) {
    return await Products.updateOne({ _id: id }, update);
  }

  async checkStock(id, quantity) {
    const prod = await Products.findById(id);
    if (prod.stock < quantity)
      throw new Error(
        `No hay stock suficiente de ${prod.title}. Total Stock ${prod.stock}`
      );
  }

  async delete(id) {
    return await Products.updateOne({ _id: id }, { status: false });
  }

  async createMany(data) {
    return await Products.insertMany(data);
  }
}

module.exports = ProductManager;
