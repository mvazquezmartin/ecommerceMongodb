// ----------------- DEPRECADO ---------------------------

const colors = require("colors");
const EnumErrors = require("../errorHandlers/enumError");

const appError = (error, req, res, next) => {
  console.log(colors.red(error.cause));

  const responseBody = {
    status: "error",
    error: error.name,
    message: error.message,
  };

  switch (error.code) {
    case EnumErrors.INVALID_TYPES_ERROR:
    case EnumErrors.DATABASE_ERROR:
    case EnumErrors.ROUTING_ERROR:
    case EnumErrors.AUTHENTICATE_ERROR:
    case EnumErrors.UNAUTHORIZED_ERROR:
      res.status(error.status).json(responseBody);
      break;

    default:
      if (!error.message) {
        responseBody.message = "Unhandled error";
      }
      console.log(colors.yellow(error.message));
      res.json(responseBody);
      break;
  }

  next();
};

module.exports = appError;
