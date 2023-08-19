require("colors");
const express = require("express");
const handlebars = require("express-handlebars");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const router = require("./router");
const { PORT } = require("./config/app.config");
const initializePassport = require("./config/passport.config");
const setUpSocket = require("./config/socketio.config");
const appError = require("./middlewares/error.middleware");
const appLogger = require("./middlewares/logger.middleware");

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());
app.use(appLogger);

router(app);

app.use(appError);

const httpServer = app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`.green);
});

setUpSocket(httpServer);
