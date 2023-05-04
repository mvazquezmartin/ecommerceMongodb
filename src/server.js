const express = require("express");
const handlebars = require("express-handlebars");
const axios = require("axios");
const { Server } = require("socket.io");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const router = require("./routes/router");
const { PORT } = require("./config/app.config");
const mongoConnect = require("../db");
const initializePassport = require("./config/passport.config");

const app = express();
const messages = [];
const urlProducts = "http://localhost:8080/api/products?limit=";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://mvm:admin@ecommerce.j1lfbb9.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "miCookie",
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport()
app.use(passport.initialize())
app.use(passport.session())


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

mongoConnect();
router(app);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log(`Cliente conectado con id: ${socket.id}`);

  socket.on("limit", (value) => {
    axios
      .get(`${urlProducts}${value}`)
      .then((response) => {
        const product = response.data;
        socket.emit("listProducts", product);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  socket.on("newUser", (user) => {
    socket.broadcast.emit("userConnected", user);
    socket.emit("messageLogs", messages);
  });

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
  });
});
