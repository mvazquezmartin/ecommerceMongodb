const Products = require("./models/products.model");

class ProductDao {
  constructor() {}

  async getProductsDb() {
    try {
      return await Products.find();
    } catch (error) {
      return error;
    }
  }

  async addProductDb(item) {
    try {
      return await Products.create(item);
    } catch (error) {
      return error;
    }
  }

  async getProductByIdDb(id) {
    try {
      return await Products.find(id);
    } catch (error) {
      return error;
    }
  }
}

module.exports = ProductDao;
