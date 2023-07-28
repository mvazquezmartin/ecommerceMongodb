const Carts = require("../models/cart.model");

class CartDao {
  async get() {
    try {
      return await Carts.find();
    } catch (error) {
      throw error.message;
    }
  }

  async getOne(id) {
    try {
      return await Carts.findById(id);
    } catch (error) {
      throw error.message;
    }
  }

  async create() {
    try {
      return await Carts.create({ products: [] });
    } catch (error) {
      throw error.message;
    }
  }

  async addProduct(cid, pid, quantity) {
    try {
      const cart = await Carts.findById(cid);
      if (!cart) throw new Error("Cart not found");
      const prod = cart.products.find((p) => p.product.toString() === pid);

      if (prod) {
        prod.quantity += quantity;
      } else {
        const newProd = { product: pid, quantity: quantity };
        cart.products.push(newProd);
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw error.message;
    }
  }

  async getProduct(cid, limit, page) {
    try {
      return await Carts.paginate(
        { _id: cid },
        { limit: limit, page: page, lean: true }
      );
    } catch (error) {
      throw error.message;
    }
  }

  async deleteProduct(cid, pid) {
    try {      
      const cart = await Carts.findById(cid);
      cart.products = cart.products.filter((prod)=> prod.product != pid)
      await cart.save()
    } catch (error) {
      throw error.message;
    }
  }

  async delete() {
    await Carts.deleteMany();
  }
}

module.exports = CartDao;
