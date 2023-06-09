const { createHash, passwordValidate } = require("../utils/cryptPassword.util");
const { generateToken } = require("../utils/jwt.util");
const usersStore = require("../store/user.store");
const MailAdapter = require("../adapters/mail.adapter");
const UsersDao = require("../dao/users.dao");
const UserDTO = require("../dtos/user.dto");
const CartService = require("./cart.service");

const msg = new MailAdapter();
const userDao = new UsersDao();
const cartService = new CartService();

const create = async (userInfo) => {
  try {
    const user = await usersStore.getOne(userInfo.email);
    if (user) return { error: "That email is already registered" };

    const pwHashed = createHash(userInfo.password);

    const newUserInfo = new UserDTO(userInfo);
    newUserInfo.password = pwHashed;

    const cart = await cartService.create();
    newUserInfo.id_cart = cart._id;

    await usersStore.create(newUserInfo);
    const access_token = generateToken({ email: newUserInfo.email });

    await msg.send(newUserInfo);

    return { access_token };
  } catch (error) {
    throw error;
  }
};

const authenticate = async (userInfo) => {
  try {
    const user = await usersStore.getOne(userInfo.email);

    if (!user) return { error: "Username and Password don't match" };
    if (!passwordValidate(userInfo.password, user))
      return { error: "Username and Password don't match" };

    const access_token = generateToken({ email: user.email, role: user.role });

    return { access_token };
  } catch (error) {
    throw error;
  }
};

const updatePw = async (email, pw) => {
  try {
    const newPw = createHash(pw);
    return await userDao.updatePw(email, newPw);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  authenticate,
  updatePw,
};
