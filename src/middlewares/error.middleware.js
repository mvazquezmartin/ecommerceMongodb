const colors = require("colors")
const EnumErrors = require("../errorHandlers/enumError");

const appError = (error, req, res, next) => {
  console.log(colors.yellow(error.cause));

  switch (error.code) {
    case EnumErrors.INVALID_TYPES_ERROR:
      res.json({ status: "Error", error: error.name });
      break;

    case EnumErrors.DATABASE_ERROR:
      res.json({ status: "Error", error: error.name });
      break;

    case EnumErrors.ROUTING_ERROR:
      res.json({ status: "Error", error: error.name });
      break;

    default:
      if (!error.message) {
        res.json({ status: "Error", error: "Unhandled error" });
      }
      console.log(colors.yellow(error.message))
      res.json({ status: "Error", error: error.message });
      break;
  }
  next();
};

module.exports = appError;
