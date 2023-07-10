const { createHash } = require("../utils/cryptPassword.util");
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

  async updatePw(email, pw){    
    return await Users.updateOne({email},{password: pw} )
    }
  
}

module.exports = UsersDao;
