const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mongoConnect = require("../db");
const router = require("./routes");
const { PORT } = require("./config/app.config");
const initializePassport = require("./config/passport.config");
const errorHandler = require("./middlewares/error.middleware");
const setUpSocket = require("./config/socketio.config");
//const loggerMiddleware = require("./middlewares/logger.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(errorHandler);
//app.use(loggerMiddleware);

initializePassport();
app.use(passport.initialize());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

router(app);
mongoConnect();

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

setUpSocket(httpServer);
