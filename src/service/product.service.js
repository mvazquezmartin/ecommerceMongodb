const ProductDao = require("../dao/product.dao");

const productDao = new ProductDao();

class ProductService {
  async getAll() {
    return await productDao.getAll();
  }

  async filter(params) {
    return await productDao.filter(params);
  }

  async create(item) {    
    return await productDao.create(item);
  }

  async getOneById(id) {
    return await productDao.getOneById(id);
  }

  async update(id, update) {
    return await productDao.update(id, update);
  }

  async checkStock(id, quantity) {
    return await productDao.checkStock(id, quantity);
  }

  async delete(id) {
    return await productDao.delete(id);
  }
}

module.exports = ProductService;
