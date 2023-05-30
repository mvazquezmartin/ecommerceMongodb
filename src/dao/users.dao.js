const Users = require("./models/user.model");

class UsersDao {
  async findUser(email) {
    return await Users.findOne({ email: email });
  }

  async createUser(newUser) {
    return await Users.create(newUser);
  }

  async findUserById(id) {
    return await Users.findById(id);
  }
}

module.exports = UsersDao;
