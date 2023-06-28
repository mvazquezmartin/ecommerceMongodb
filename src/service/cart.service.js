const CartDao = require("../dao/cart.dao");

const cartDao = new CartDao();

class CartService {
  async create() {
    return await cartDao.create();
  }

  async get() {
    return await cartDao.get();
  }

  async getOne(id) {
    return await cartDao.getOne(id);
  }

  async addProduct(cid, pid, quantity) {
    return await cartDao.addProduct(cid, pid, quantity);
  }

  async getProduct(cid, limit, page) {
    return await cartDao.getProduct(cid, limit, page);
  }

  async deleteProduct(cid, limit, page) {
    return await cartDao.deleteProduct(cid, limit, page);
  }

  async checkStock(pid, quantity) {
    return await cartDao.checkStock(pid, quantity);
  }

  async delete(id) {
    return await cartDao.delete(id);
  }
}

module.exports = CartService;
