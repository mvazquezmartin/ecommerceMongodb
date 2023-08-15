const { enviroment } = require("../config/logger.config");

switch (enviroment) {
  case "development":
    console.log("Development log");
    module.exports = require("./dev.logger");
    break;

  case "local":
    console.log("Local log");
    module.exports = require("./local.logger");
    break;
}
