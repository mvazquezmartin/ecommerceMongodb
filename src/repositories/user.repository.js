class UserManagerRepository {
  constructor(userManager) {
    this.userManager = userManager;
  }

  async getAll() {
    return await this.userManager.getAll();
  }

  async getOne(user) {
    return await this.userManager.getOne(user);
  }

  async getOneById(id) {
    return await this.userManager.getOneById(id);
  }

  async create(userInfo) {
    return await this.userManager.create(userInfo);
  }

  async update(ip, update) {
    return await this.userManager.update(ip, update);
  }

  async delete(id) {
    return await this.userManager.delete(id);
  }

  async deleteAll() {
    return await this.userManager.deleteAll();
  }
}

module.exports = UserManagerRepository;
