const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const router = require("./routes/router");

const app = express();
const PORT = 8080;

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

io.on('connection', socket =>{
  console.log(`Cliente conectado con id: ${socket.id}`)

  socket.on('nuevoProducto', (producto) => {
    console.log(`Se agregó un nuevo producto: ${producto}`);
    productos.push(producto);
    io.emit('productos', productos);
});
})

