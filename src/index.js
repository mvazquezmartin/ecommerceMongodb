const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mongoConnect = require("../db");
const router = require("./routes");
const { PORT } = require("./config/app.config");
const initializePassport = require("./config/passport.config");
const setUpSocket = require("./config/socketio.config");
const errorMiddleware = require("./middlewares/error.middleware");
const swaggerRoute = require("./controller/swagger.controller");
//const loggerMiddleware = require("./middlewares/logger.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());

router(app);
mongoConnect();

initializePassport();
app.use(passport.initialize());

app.use(errorMiddleware);
//app.use(loggerMiddleware);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

setUpSocket(httpServer);
