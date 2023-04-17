const Carts = require("./models/cart.model");

class CartDao {
  constructor() {}

  async getCartsDb() {
    try {
      return await Carts.find();
    } catch (error) {
      return error;
    }
  }

  async createCartDb() {
    try {
    } catch (error) {}
  }

  async getCartByIdDb() {
    try {
    } catch (error) {}
  }

  async addProductCartDb() {
    try {
    } catch (error) {}
  }
}

module.exports = CartDao;
