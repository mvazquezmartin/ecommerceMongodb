const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.idCounter = 1;
    this.path = path;
  }

  async addProduct(item) {
    try {
      const { title, description, price, thumbnail, code, stock } = item;
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son necesarios.");
        return;
      }
      if (this.uniqueCode(code)) return;
      const newProduct = {
        id: this.idCounter,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(newProduct);
      this.idCounter++;
      await this.saveFile();
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      await this.readFile();
      return this.products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      await this.readFile();
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
        if (this.uniqueCode(updated.code)) return null;
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
        this.products.splice(index, 1);
        await this.saveFile();
        console.log("Product removed!");
      } else {
        console.log("Not found.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.log(error);
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
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

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.path, "");
      this.products = [];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductManager;





// const productManager = new ProductManager(file);
// async function main() {
//   await productManager.deleteAll();
//   await productManager.addProduct({
//     title: "Producto 1",
//     description: "Esto es una descripcion del prod 1",
//     price: 100,
//     thumbnail: "estoEsUnaImg1.jpg",
//     code: "Code001",
//     stock: 20,
//   });

//   await productManager.addProduct({
//     title: "Producto 2",
//     description: "Esto es una descripcion del prod 2",
//     price: 200,
//     thumbnail: "estoEsUnaImg2.jpg",
//     code: "Code002",
//     stock: 20,
//   });

//   await productManager.addProduct({
//     title: "Producto 3",
//     description: "Esto es una descripcion del prod 3",
//     price: 300,
//     thumbnail: "estoEsUnaImg3.jpg",
//     code: "Code003",
//     stock: 30,
//   });

//   const product01 = await productManager.getProductById(1);
//   console.log(product01);

//   const product3 = await productManager.getProductById(2);
//   console.log(product3);

//   const updatedProduct = await productManager.updateProduct(1, {
//     title: "Esto es un cambio",
//     price: 6969,
//     code: "Code102",
//   });
//   console.log("Update:",updatedProduct);
//   await productManager.deleteProduct(2);
//   const allProducts = await productManager.getProducts();
//   console.log(allProducts);
// }

// main();
