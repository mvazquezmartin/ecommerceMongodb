const CustomError = require("../customError");
const enumErrors = require("../errorNum");
const generateErrorInfo = require("../infoError");

const userError = (userInfo) => {
  CustomError.createError({
      name: "Error al crear el usuario",
      cause: generateErrorInfo(enumErrors.INVALID_TYPES_ERROR, userInfo),
      message: "Error por datos no válidos",
      code: enumErrors.INVALID_TYPES_ERROR,
  });
}

module.exports = userError;