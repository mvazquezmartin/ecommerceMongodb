const UsersDao = require("../dao/users.dao");

const Users = new UsersDao();

const create = async (newUserInfo) => {
  return await Users.create(newUserInfo);
};

const getOne = async (item) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item);

  if (isEmail) {
    return await Users.getOne(item);
  } else {
    return await Users.getOneById(item);
  }
};

module.exports = {
  create,
  getOne
}