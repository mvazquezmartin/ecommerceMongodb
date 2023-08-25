const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class Cart {
  constructor(path) {
    this.carts = [];
    this.path = path;
  }

  async getAll() {
    try {
      await this.readFile();
      return this.carts;
    } catch (error) {
      throw error;
    }
  }

  async getOne(cid) {
    try {
      await this.readFile();
      const carrito = this.carts.find((cart) => cart._id === cid);
      return carrito ? carrito : [];
    } catch (error) {
      throw error;
    }
  }

  async create() {
    try {
      await this.readFile();

      const _id = uuidv4();
      const newCart = { _id, products: [] };

      this.carts.push(newCart);

      await this.saveFile();

      return newCart;
    } catch (error) {
      throw error;
    }
  }

  async update(cid, update) {
    try {
      await this.readFile();

      const cartIndex = this.carts.findIndex((cart) => cart._id === cid);
      this.carts[cartIndex] = update;

      await this.saveFile();

      const cart = this.carts[cartIndex];
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async delete(cid) {
    try {
      await this.readFile();

      const cartIndex = this.carts.findIndex((cart) => cart._id === cid);
      const cart = this.carts[cartIndex];

      this.carts.splice(cartIndex, 1);

      await this.saveFile();

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      if (data) this.carts = JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
    } catch (error) {
      throw error;
    }
  }

  async deleteAllCarts() {
    try {
      await fs.promises.writeFile(file, "");
      this.carts = [];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Cart;
