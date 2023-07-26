const colors = require("colors");
const EnumErrors = require("../errorHandlers/enumError");

const appError = (error, req, res, next) => {
  console.log(colors.red(error.cause));

  switch (error.code) {
    case EnumErrors.INVALID_TYPES_ERROR:
      res.json({ status: "error", error: error.name, message: error.message });
      break;

    case EnumErrors.DATABASE_ERROR:
      res.json({ status: "error", error: error.name, message: error.message });
      break;

    case EnumErrors.ROUTING_ERROR:
      res.json({ status: "error", error: error.name, message: error.message });
      break;

    case EnumErrors.AUTHENTICATE_ERROR:
      res.json({ status: "error", error: error.name, message: error.message });
      break;

    default:
      if (!error.message) {
        res.json({ status: "error", error: "Unhandled error" });
      }
      console.log(colors.yellow(error.message));
      res.json({ status: "error", error: error.message });
      break;
  }
  next();
};

module.exports = appError;
