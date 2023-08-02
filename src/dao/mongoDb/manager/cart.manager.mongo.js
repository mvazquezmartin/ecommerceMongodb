const Carts = require("../models/cart.model");

class CartManager {
  async getAll() {
    try {
      const data = await Carts.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id) {
    try {
      const data = await Carts.findById(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async create() {
    try {
      const data = await Carts.create({ products: [] });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(id, update) {
    try {
      const data = await Carts.findByIdAndUpdate(id, update);
      return data;
    } catch (error) {
      throw error;
    }
  }

  // async getProduct(cid, limit, page) {
  //   try {
  //     return await Carts.paginate(
  //       { _id: cid },
  //       { limit: limit, page: page, lean: true }
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async delete() {
    await Carts.deleteMany();
  }
}

module.exports = CartManager;
