const CartDao = require("../dao/cart.dao");

class CartService {
  async create() {
    return await CartDao.create;
  }

  async addProduct(cid, pid) {
    return await CartDao.addProduct(cid, pid);
  }

  async gerProduct(cid, limit, page) {
    return await CartDao.getProduct(cid, limit, page);
  }

  async deleteProduct(cid, limit, page) {
    return await CartDao.deleteProduct(cid, limit, page);
  }

  async delete(id) {
    return await CartDao.delete(id);
  }
}

module.exports = CartService;
