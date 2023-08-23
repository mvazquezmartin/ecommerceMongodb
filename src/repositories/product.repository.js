class ProductManagerRepository {
  constructor(producManager) {
    this.productManager = producManager;
  }

  async getAll() {
    return await this.productManager.getAll();
  }

  async getOneById(id) {
    return await this.productManager.getOneById(id);
  }

  async filter(params) {
    return await this.productManager.filter(params);
  }

  async create(item) {
    return await this.productManager.create(item);
  }

  async update(id, update) {
    return await this.productManager.update(id, update);
  }

  async delete(id) {
    return await this.productManager.delete(id);
  }

  async createMany(doc) {
    return await this.productManager.createMany(doc);
  }
}

module.exports = ProductManagerRepository;
