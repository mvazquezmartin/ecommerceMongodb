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
  async getOne(email) {
    try {
      const data = await Users.findOne({ email: email });
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

  // async createOwnProd(email, pid) {
  //   return await Users.findOneAndUpdate(
  //     { email: email },
  //     { $push: { own_prod: pid } },
  //     { new: true }
  //   );
  // }

  // async checkOwnProd(email, pid) {
  //   const user = await Users.findOne({ email: email });
  //   return user.own_prod.includes(pid);
  // }
}

module.exports = UsersManager;
