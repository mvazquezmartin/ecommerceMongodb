const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "htpp" }),
    new winston.transports.File({ filename: "./error.log", level: "silly" }),
  ],
});

const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`
  );
  next();
};

module.exports = addLogger;
