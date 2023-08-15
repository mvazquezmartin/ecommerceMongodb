const CustomError = require("../CustomError");
const enumErrors = require("../enumError");
const generateErrorInfo = require("../infoError");

const userInfoError = (userInfo) => {
  if (
    !userInfo.first_name ||
    !userInfo.last_name ||
    !userInfo.email ||
    !userInfo.password
  ) {
    CustomError.create({
      status: 400,
      name: "User creation error",
      cause: generateErrorInfo(enumErrors.INVALID_TYPES_ERROR, userInfo),
      message: "Error trying to create user",
      code: enumErrors.INVALID_TYPES_ERROR,
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
    CustomError.create({
      status: 400,
      name: "User creation error",
      cause: "The email entered does not have the basic email format",
      message: "Invalid email format",
      code: enumErrors.INVALID_TYPES_ERROR,
    });
  }
};

const userUniqueError = (data) => {
  if (data.status === "error") {
    CustomError.create({
      status: 409,
      name: "User creation error",
      cause: "The email used by the new user already exists",
      message: data.message,
      code: enumErrors.INVALID_TYPES_ERROR,
    });
  }
};

const userAuthenticateError = (data) => {
  if (data.status === "error") {
    CustomError.create({
      status: 406,
      name: "User authetication error",
      cause: data.message,
      message: data.message,
      code: enumErrors.AUTHENTICATE_ERROR,
    });
  }
};

module.exports = { userInfoError, userUniqueError, userAuthenticateError };
