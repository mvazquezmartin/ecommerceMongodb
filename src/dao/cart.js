const fs = require("fs");
const file = "./file/cart.json";

class Cart {
  constructor() {
    this.carts = [];
    this.idCounter = 1;
  }

  async createCart() {
    try {
      await this.readFile();
      const carrito = { id: this.idCounter, products: [] };
      this.carts.push(carrito);
      this.idCounter++;
      await this.saveFile();
      return carrito;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getCarts() {
    try {
      await this.readFile();
      return this.carts;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(cid) {
    try {
      await this.readFile();
      const carrito = this.carts.find((cart) => cart.id === cid);
      return carrito ? carrito : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addProductCart(cid, pid, quantity) {
    try {
      await this.readFile();
      const cartIndex = this.carts.findIndex((cart) => cart.id === cid);
      if (cartIndex === -1) return null;
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
      console.log(error);
      return null;
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(file, "utf-8");
      this.carts = JSON.parse(data);
      if (this.carts.length === 0) {
        this.idCounter = 1;
      } else {
        const lastCarrito = this.carts[this.carts.length - 1];
        this.idCounter = parseInt(lastCarrito.id) + 1;
      }
    } catch (error) {
      console.log(error);
      this.carts = [];
      this.idCounter = 1;
    }
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(file, JSON.stringify(this.carts));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllCarts() {
    try {
      await fs.promises.writeFile(file, "");
      this.carts = [];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Cart;
