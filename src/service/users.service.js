const UsersDao = require("../dao/users.dao");
const { createHash, passwordValidate } = require("../utils/cryptPassword.util");
const { generateToken } = require("../utils/jwt.util");

const Users = new UsersDao();

const create = async (userInfo) => {
  try {
    const user = await Users.findUser(userInfo.email);
    if (user) return { error: "That email is already registered" };

    const pwHashed = createHash(userInfo.password);

    const newUserInfo = {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
      age: userInfo.age,
      password: pwHashed,
    };

    const newUser = await Users.createUser(newUserInfo);
    const access_token = generateToken({ email: newUserInfo.email });

    return { user: newUser, access_token };
  } catch (error) {
    throw error;
  }
};

const validate = async (userInfo) => {
  try {
    const user = await Users.findUser(userInfo.email);

    if (!user) return { error: "Username and Password don't match" };
    if (!passwordValidate(userInfo.password, user))
      return { error: "Username and Password don't match" };

    const access_token = generateToken({ email: user.email, role: user.role });

    return  access_token ;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  validate,
};
