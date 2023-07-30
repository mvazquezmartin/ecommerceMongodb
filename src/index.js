const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mongoConnect = require("../db");
const router = require("./routes");
const { PORT, environment } = require("./config/app.config");
const initializePassport = require("./config/passport.config");
const setUpSocket = require("./config/socketio.config");
const appError = require("./middlewares/error.middleware");
//const appLogger = require("./middlewares/logger.middleware");

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

router(app);

app.use(appError);
//app.use(appLogger);

const httpServer = app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

setUpSocket(httpServer);
