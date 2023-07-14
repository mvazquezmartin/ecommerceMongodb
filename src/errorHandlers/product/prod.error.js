const CustomError = require("../CustomError");
const EnumErrors = require("../enumError");
const generateErrorInfo = require("../infoError");

const productError = (obj) => {
  if (
    !obj.title ||
    !obj.description ||
    !obj.price ||
    !obj.thumbail ||
    !obj.code ||
    !obj.stock ||
    !obj.category
  ) {
    CustomError.create({
      name: "Error al agregar el producto",
      cause: generateErrorInfo(EnumErrors.INVALID_TYPES_ERROR, obj),
      message: "Error por datos inválidos",
      code: EnumErrors.INVALID_TYPES_ERROR,
    });
  }
};

module.exports = productError;
