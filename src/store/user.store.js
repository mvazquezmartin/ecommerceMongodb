const UsersDao = require("../dao/mongoDb/manager/users.manager.mongo");

const Users = new UsersDao();

const create = async (newUserInfo) => {
  return await Users.create(newUserInfo);
};

const getOne = async (item) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item);

  if (isEmail) {
    return await Users.getOne({ email: item });
  } else {
    return await Users.getOneById(item);
  }
};

module.exports = {
  create,
  getOne
}