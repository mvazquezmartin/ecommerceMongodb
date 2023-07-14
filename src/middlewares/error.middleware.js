const EnumErrors = require("../errorHandlers/enumError");

const errorMiddleware = (error, req, res, next) => {
  console.log(error.cause);

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
      res.json({ status: "Error", error: "Unhandled error" });
      break;
  }
  next();
};

module.exports = errorMiddleware;
