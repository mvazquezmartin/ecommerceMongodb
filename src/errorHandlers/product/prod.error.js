const { isValidObjectId } = require("mongoose");
const CustomError = require("../CustomError");
const EnumErrors = require("../enumError");
const generateErrorInfo = require("../infoError");
const productService = require("../../service/product.service");

const productInfoError = (obj) => {
  if (
    !obj.title ||
    !obj.description ||
    !obj.price ||
    !obj.thumbnail ||
    !obj.code ||
    !obj.stock ||
    !obj.category
  ) {
    obj.errorType = "productInfoError";
    CustomError.create({
      name: "Error al agregar el producto",
      cause: generateErrorInfo(EnumErrors.INVALID_TYPES_ERROR, obj),
      message: "Error por datos inválidos",
      code: EnumErrors.INVALID_TYPES_ERROR,
    });
  }
};

const productValidIdError = (pid) => {
  if (!isValidObjectId(pid)) {
    const pidObj = { _id: pid, errorType: "producValidIdError" };
    CustomError.create({
      name: "Invalid ID",
      cause: generateErrorInfo(EnumErrors.INVALID_TYPES_ERROR, pidObj),
      message: "El ID del producto es invalido",
      code: EnumErrors.INVALID_TYPES_ERROR,
    });
  }
};

const productStatusError = (data) => {
  if (data.status === "error") {
    CustomError.create({
      name: "Product not found",
      cause: `No product found with the Id: ${data._id}`,
      message: data.message,
      code: EnumErrors.DATABASE_ERROR,
    });
  }
};

const productOwnerError = async (pid, user) => {
  const response = await productService.getOneById(pid);
  if (response.data.owner === user.email) {
    CustomError.create({
      name: "Unauthorized",
      cause:
        "The user tried to modify or delete a product that does not belong to him",
      message: "You do not have permissions to do this action",
      code: EnumErrors.UNAUTHORIZHED_ERROR,
    });
  }
};

const productCheckStockError = async (pid, quantity) => {
  const prod = await productService.getOneById(pid);
  if (prod.data.stock < quantity) {
    CustomError.create({
      name: "Not stock enough",
      cause: "The user tried to add a product that there is not enough stock",
      message: `Not enough stock of ${prod.data.title}. Total Stock ${prod.data.stock}`,
      code: EnumErrors.DATABASE_ERROR,
    });
  }
};
module.exports = {
  productInfoError,
  productValidIdError,
  productStatusError,
  productOwnerError,
  productCheckStockError,
};
