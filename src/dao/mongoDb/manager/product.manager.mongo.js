const Products = require("../models/products.model");

class ProductManager {
  async getAll() {
    try {
      const data = await Products.find({ status: true });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const data = await Products.findOne({ _id: id, status: true });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async filter(params) {
    try {
      const data = await Products.filterProducts(params);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async create(item) {
    try {
      const data = await Products.create(item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(id, update) {
    try {
      const data = await Products.findByIdAndUpdate(id, update);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const data = await Products.findByIdAndUpdate(
        { _id: id },
        { status: false }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createMany(doc) {
    try {
      const data = await Products.insertMany(doc);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductManager;
