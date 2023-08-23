const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class Cart {
  constructor(path) {
    this.carts = [];
    this.path = path;
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

  async getAll() {
    try {
      await this.readFile();
      return this.carts;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cid) {
    try {
      await this.readFile();
      const carrito = this.carts.find((cart) => cart.id === cid);
      return carrito ? carrito : [];
    } catch (error) {
      throw error;
    }
  }

  async addProductCart(cid, pid, quantity) {
    try {
      await this.readFile();
      const cartIndex = this.carts.findIndex((cart) => cart.id === cid);
      if (cartIndex === -1) return [];
      const productIndex = this.carts[cartIndex].products.findIndex(
        (prod) => prod.id === pid
      );
      if (productIndex === -1) {
        const product = { id: pid, quantity };
        this.carts[cartIndex].products.push(product);
      } else {
        this.carts[cartIndex].products[productIndex].quantity += quantity;
      }
      await this.saveFile();
      return this.carts[cartIndex];
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
