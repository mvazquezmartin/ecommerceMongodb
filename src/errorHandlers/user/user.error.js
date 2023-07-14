const CustomError = require("../CustomError");
const enumErrors = require("../enumError");
const generateErrorInfo = require("../infoError");

const userError = (userInfo) => {
  if (!userInfo.first_name || !userInfo.last_name || !userInfo.email) {
    CustomError.create({
      name: "User creation error",
      cause: generateErrorInfo(enumErrors.INVALID_TYPES_ERROR, userInfo),
      message: "Error trying to create user",
      code: enumErrors.INVALID_TYPES_ERROR,
    });
  }
};

module.exports = userError;
