const Users = require("../models/user.model");

class UsersDao {
  async getOne(email) {
    return await Users.findOne({ email: email });
  }

  async create(newUser) {
    return await Users.create(newUser);
  }

  async getOneById(id) {
    return await Users.findById(id);
  }

  async updatePw(email, pw) {
    return await Users.updateOne({ email }, { password: pw });
  }

  async createOwnProd(email, pid) {
    return await Users.findOneAndUpdate(
      { email: email },
      { $push: { own_prod: pid } },
      { new: true }
    );
  }

  async checkOwnProd(email, pid) {
    const user = await Users.findOne({ email: email });
    return user.own_prod.includes(pid);
  }
}

module.exports = UsersDao;
