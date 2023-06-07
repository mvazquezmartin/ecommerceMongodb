const Products = require("./models/products.model");

class ProductDao {
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
    return await Products.findOne({ _id: id });
  }

  async update(id, update) {
    return await Products.updateOne({ _id: id }, update);
  }

  async delete(id) {
    return await Products.updateOne({ _id: id }, { status: false });
  }

  async createMany(data) {
    return await Products.insertMany(data);
  }
}

module.exports = ProductDao;
