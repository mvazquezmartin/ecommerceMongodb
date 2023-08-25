const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async getAll() {
    try {
      await this.readFile();

      const productStatusTrue = this.products.filter(
        (prod) => prod.status === true
      );
      
      this.products = productStatusTrue;
      
      return this.products;
    } catch (error) {
      throw error;
    }
  }

  async getOneById(id) {
    try {
      await this.readFile();

      const pid = id;
      const product = this.products.find((product) => product._id === pid);

      return product;
    } catch (error) {
      throw error;
    }
  }
  //filter

  async filter(params) {
    try {
      if (this.products.length === 0) {
        await this.readFile();
      }

      let filteredProducts = [...this.products];

      if (params.category !== null) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === params.category
        );
      }

      if (params.priceMin !== null && params.priceMax !== null) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.price >= parseInt(params.priceMin) &&
            product.price <= parseInt(params.priceMax)
        );
      }

      if (params.sort) {
        const sortOrder = params.sort === "asc" ? 1 : -1;
        filteredProducts.sort((a, b) => (a.price - b.price) * sortOrder);
      }

      const totalDocs = filteredProducts.length;
      const limit = parseInt(params.limit) || 10;
      const totalPages = Math.ceil(totalDocs / limit);
      const page = parseInt(params.page) || 1;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      const baseUrl = `?category=${params.category}&priceMin=${params.priceMin}&priceMax=${params.priceMax}&sort=${params.sort}`;
      const prevPage = page > 1 ? page - 1 : null;
      const nextPage = page < totalPages ? page + 1 : null;
      const prevPageLink = prevPage ? `${baseUrl}&page=${prevPage}` : null;
      const nextPageLink = nextPage ? `${baseUrl}&page=${nextPage}` : null;

      return {
        docs: paginatedProducts,
        totalDocs,
        limit,
        totalPages,
        page,
        prevPageLink,
        nextPageLink,
      };
    } catch (error) {
      throw error;
    }
  }

  async create(item) {
    try {
      const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        owner = "admin",
        status = true,
      } = item;

      const uniqueID = uuidv4();

      const newProduct = {
        _id: uniqueID,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        owner,
        status,
      };

      await this.readFile();
      this.products.push(newProduct);
      await this.saveFile();

      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async update(id, updates) {
    try {
      await this.readFile();

      const index = this.products.findIndex((prod) => prod._id === id);

      const updatedProduct = { ...this.products[index], ...updates };
      this.products[index] = updatedProduct;

      await this.saveFile();
      const product = this.products[index];

      return product;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      await this.readFile();
      const index = this.products.findIndex((prod) => prod._id === id);

      this.products[index].status = false;
      await this.saveFile();

      const product = this.products[index];
      console.log(product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      throw error;
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      if (data) this.products = JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.path, "");
      this.products = [];
    } catch (error) {
      throw error;
    }
  }

  async status() {
    try {
      await this.readFile();
      this.products.forEach((item) => (item.status = true));
      await this.saveFile();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductManager;
