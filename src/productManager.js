const fs = require("fs");
const file = "./file/productos.json";

class ProductManager {
  constructor() {
    this.products = [];
    this.idCounter = 1;
  }

  async addProduct(item) {
    try {
      if (!item) {
        console.log("El objeto enviado es undefined.");
        return;
      }
      const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status = true,
      } = item;
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error("Todos los campos son necesarios.");        
      }
      if (this.uniqueCode(code)) return;
      const lastProduct = await this.getLastProduct();
      const lastId = lastProduct ? lastProduct.id + 1 : 1;
      const newProduct = {
        id: lastId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
      };
      await this.readFile();
      this.products.push(newProduct);
      this.idCounter++;
      await this.saveFile();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async getProducts() {
    try {
      await this.readFile();
      const productStatusTrue = this.products.filter(
        (prod) => prod.status === true
      );
      this.products = productStatusTrue;
      return this.products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      await this.getProducts();
      const product = this.products.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        console.log("Not found.");
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, updated) {
    try {
      await this.readFile();
      const index = this.products.findIndex((prod) => prod.id === id);
      if (index !== -1) {
        delete updated.id;
        //if (this.uniqueCode(updated.code)) return null;
        this.products[index] = { ...this.products[index], ...updated };
        await this.saveFile();
        return this.products[index];
      } else {
        console.log("Not found.");
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      await this.readFile();
      const index = this.products.findIndex((prod) => prod.id === id);
      if (index !== -1) {
        this.products[index].status = false;
        await this.saveFile();
        console.log("Producto Eliminado");
      } else {
        throw new Error("No se encontro el producto");
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async reduceStock(id, quantity) {
    try {
      await this.getProducts();
      const index = this.products.findIndex((prod) => prod.id === id);
      if (index !== -1) {
        this.products[index].stock -= quantity;
        if (this.products[index].stock < 0) this.products[index].status = false;
        await this.saveFile();
      } else {
        console.log("No se encontro el producto");
      }
    } catch (error) {}
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(file, JSON.stringify(this.products));
    } catch (error) {
      console.log(error);
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(file, "utf-8");
      if (data) this.products = JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }

  uniqueCode(code) {
    if (this.products.some((product) => product.code === code)) {
      console.log(`Ya existe un producto con este Codigo: ${code}`);
      return true;
    } else {
      return false;
    }
  }

  async getLastProduct() {
    try {
      await this.readFile();
      const lastProd = this.products[this.products.length - 1];
      return lastProd;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(file, "");
      this.products = [];
    } catch (error) {
      console.log(error);
    }
  }

  async status() {
    try {
      await this.readFile();
      this.products.forEach((item) => (item.status = true));
      await this.saveFile();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductManager;
