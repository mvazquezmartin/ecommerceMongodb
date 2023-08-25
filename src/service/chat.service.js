const { chatManager } = require("../repositories/index");

const getAll = async () => {
  try {
    const data = await chatManager.getAll();
    return {
      status: "success",
      message: "Found messages",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const create = async (msj) => {
  try {
    const data = await chatManager.create(msj);
    return {
      status: "success",
      message: "Message created",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { getAll, create };
