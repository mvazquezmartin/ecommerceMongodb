const { userManager } = require("../repositories/index");

const create = async (newUserInfo) => {
  return await userManager.create(newUserInfo);
};

const getOne = async (item) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item);

  if (isEmail) {
    return await userManager.getOne({ email: item });
  } else {
    return await userManager.getOneById(item);
  }
};

const getOneByToken = async (token) => {
  return await userManager.getOne({
    recoveryToken: token,
    recoveryTokenExpires: { $gt: Date.now() },
  });
};

module.exports = {
  create,
  getOne,
  getOneByToken,
};
