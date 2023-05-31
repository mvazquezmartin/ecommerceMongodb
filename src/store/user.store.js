const UsersDao = require("../dao/users.dao");

const Users = new UsersDao();

const create = async (newUserInfo) => {
  return await Users.createUser(newUserInfo);
};

const getOne = async (item) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item);

  if (isEmail) {
    return await Users.findUser(item);
  } else {
    return await Users.findUserById(item);
  }
};

module.exports = {
  create,
  getOne
}