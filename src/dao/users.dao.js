const Users = require("./models/user.model");

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
}

module.exports = UsersDao;
