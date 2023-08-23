class CartManagerRepository {
  constructor(cartManager) {
    this.cartManager = cartManager;
  }

  async getAll() {
    return await this.cartManager.getAll();
  }

  async getOne(id) {
    return await this.cartManager.getOne(id);
  }

  async create() {
    return await this.cartManager.create();
  }

  async update(id, update) {
    return await this.cartManager.update(id, update);
  }

  async deleteOne(id) {
    return await this.cartManager.deleteOne(id);
  }

  async deleteAll() {
    return await this.cartManager.delete();
  }
}

module.exports = CartManagerRepository;
