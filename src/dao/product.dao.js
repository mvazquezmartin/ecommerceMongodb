const Products = require("./models/products.model");

class ProductDao {
  async getProductsDb() {
    return await Products.find({ status: true });
  }

  async filterProductsDb(params) {
    return await Products.filterProducts(params);
  }

  async addProductDb(item) {
    return await Products.create(item);
  }

  async getProductByIdDb(id) {
    return await Products.findOne({ _id: id });
  }

  async updateProductDb(id, update) {
    return await Products.updateOne({ _id: id }, update);
  }

  async deleteProductDb(id) {
    return await Products.updateOne({ _id: id }, { status: false });
  }

  async addManyDb(data) {
    return await Products.insertMany(data);
  }
}

module.exports = ProductDao;
