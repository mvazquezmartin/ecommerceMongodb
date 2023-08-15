const { isValidObjectId } = require("mongoose");
const CustomError = require("../CustomError");
const EnumErrors = require("../enumError");
const generateErrorInfo = require("../infoError");
const userStore = require("../../store/user.store");
const cartService = require("../../service/cart.service");

const validId = (cid) => {
  if (!isValidObjectId(cid)) {
    const cidObj = { _id: cid, errorType: "cartValidIdError" };
    CustomError.create({
      status: 400,
      name: "Invalid ID",
      cause: generateErrorInfo(EnumErrors.INVALID_TYPES_ERROR, cidObj),
      message: "Cart ID is invalid",
      code: EnumErrors.INVALID_TYPES_ERROR,
    });
  }
};

const status = (data) => {
  if (data.status === "error") {
    CustomError.create({
      status: 404,
      name: "Cart not found",
      cause: `No cart found with the Id: ${data._id}`,
      message: data.message,
      code: EnumErrors.DATABASE_ERROR,
    });
  }
};

const quantity = (quantity) => {
  if (isNaN(quantity)) {
    CustomError.create({
      status: 400,
      name: "Not quantity",
      cause: "The user did not specify the quantity of the product",
      message: "Need to specify quantity",
      code: EnumErrors.INVALID_TYPES_ERROR,
    });
  }
};

const owner = async (cid, user) => {
  const userData = await userStore.getOne(user.email);
  const cartData = await cartService.getOneById(cid);

  const userIdString = userData.id_cart.toString();
  const cartIdString = cartData.data._id.toString();

  if (userIdString !== cartIdString) {
    CustomError.create({
      status: 401,
      name: "Unauthorized",
      cause:
        "The user tried to modify or delete a product from a cart that does not belong to him",
      message: "You do not have permissions to do this action",
      code: EnumErrors.UNAUTHORIZHED_ERROR,
    });
  }
};

module.exports = {
  validId,
  status,
  quantity,
  owner,
};
