const { isValidObjectId } = require("mongoose");

const info = (item) => {
  return (
    !item.title ||
    !item.description ||
    !item.price ||
    !item.thumbnail ||
    !item.code ||
    !item.stock ||
    !item.category
  );
};

const validId = (pid) => {
  return !isValidObjectId(pid);
};

module.exports = { info, validId };
