const { isValidObjectId } = require("mongoose");

const validId = (cid) => {
  return !isValidObjectId(cid);
};

module.exports = { validId };
