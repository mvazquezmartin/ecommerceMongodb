// ----------------- DEPRECADO ---------------------------

const { isValidObjectId } = require("mongoose");
const CustomError = require("../CustomError");
const enumErrors = require("../enumError");
const generateErrorInfo = require("../infoError");
const productService = require("../../service/product.service");

const info = (obj) => {
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
      status: 400,
      name: "Error adding or update product",
      cause: generateErrorInfo(enumErrors.INVALID_TYPES_ERROR, obj),
      message: "Invalid data error",
      code: enumErrors.INVALID_TYPES_ERROR,
    });
  }
};

const validId = (pid) => {
  if (!isValidObjectId(pid)) {
    const pidObj = { _id: pid, errorType: "producValidIdError" };
    CustomError.create({
      status: 400,
      name: "Invalid ID",
      cause: generateErrorInfo(enumErrors.INVALID_TYPES_ERROR, pidObj),
      message: "The product ID is invalid",
      code: enumErrors.INVALID_TYPES_ERROR,
    });
  }
};

const status = (data) => {
  if (data.status === "error") {
    CustomError.create({
      status: 404,
      name: "Product not found",
      cause: `No product found with the Id: ${data._id}`,
      message: data.message,
      code: enumErrors.DATABASE_ERROR,
    });
  }
};

const owner = async (pid, user) => {
  const response = await productService.getOneById(pid);
  if (response.data.owner !== user.email) {
    CustomError.create({
      status: 401,
      name: "Unauthorized",
      cause:
        "The user tried to modify or delete a product that does not belong to him",
      message: "You do not have permissions to do this action",
      code: enumErrors.UNAUTHORIZHED_ERROR,
    });
  }
};

const checkStock = async (pid, quantity) => {
  const prod = await productService.getOneById(pid);
  if (prod.data.stock < quantity) {
    CustomError.create({
      status: 409,
      name: "Not stock enough",
      cause: "The user tried to add a product that there is not enough stock",
      message: `Not enough stock of ${prod.data.title}. Total Stock ${prod.data.stock}`,
      code: enumErrors.DATABASE_ERROR,
    });
  }
};
module.exports = {
  info,
  validId,
  status,
  owner,
  checkStock,
};
