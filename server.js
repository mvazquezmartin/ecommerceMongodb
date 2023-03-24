const express = require("express");
const handlebars = require("express-handlebars");
const axios = require("axios");
const { Server } = require("socket.io");
const router = require("./routes/router");

const app = express();
const PORT = 8080;
const urlProducts = "http://localhost:8080/api/products/";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

router(app);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log(`Cliente conectado con id: ${socket.id}`);

  socket.emit("msj", "Este mensaje se enviará a todos los clientes");

  axios
    .get(urlProducts)
    .then((response)=>{
      const product = response.data
      socket.emit("listProducts", product)
    })
    .catch((error)=>{
      console.log(error)
    })  
});
