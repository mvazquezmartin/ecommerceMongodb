const Users = require("../models/user.model");

class UsersManager {
  async getAll() {
    try {
      const data = await Users.find();      
      return data;
    } catch (error) {
      throw error;
    }
  }
  async getOne(user) {
    try {
      const data = await Users.findOne(user);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const data = await Users.findById(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async create(userInfo) {
    try {
      const data = await Users.create(userInfo);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(id, update) {
    try {
      const data = await Users.findByIdAndUpdate(id, update);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const data = await Users.findByIdAndDelete(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      await Users.deleteMany();
      return "Todo fue eliminado o_o";
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersManager;
