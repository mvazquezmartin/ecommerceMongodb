const winston = require("winston");
const customLevelOptions = require("./levelOptions.logger");

const logger = winston.createLogger({
  level: customLevelOptions.level,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./logs/devWarning.log",
      level: "error",
      format: winston.format.simple(),
    }),
  ],
});

module.exports = logger;
