require("colors");
const { enviroment } = require("../config/logger.config");

switch (enviroment) {
  case "development":
    console.log("Development log".bgGreen);
    module.exports = require("./dev.logger");
    break;

  case "local":
    console.log("Local log".bgGreen);
    module.exports = require("./local.logger");
    break;
}
