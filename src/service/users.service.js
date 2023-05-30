const UsersDao = require("../dao/users.dao");
const { createHash } = require("../utils/cryptPassword.util");

const Users = new UsersDao();

const create = async (userInfo) => {
  const pwHashed = createHash(userInfo.password);

  const newUserInfo = {
    first_name,
    last_name,
    email,
    age,
    password: pwHashed,
  };

  const newUser = await Users.createUser(newUserInfo);

  return newUser;
};

module.exports = {
  create,
};
