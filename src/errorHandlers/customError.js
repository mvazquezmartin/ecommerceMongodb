class CustomError {
  static create({ status, name = "error", cause, message, code = 1 }) {
    const error = new Error(message);
    error.status = status
    error.name = name;
    error.cause = cause;
    error.code = code;

    throw error;
  }
}

module.exports = CustomError;
