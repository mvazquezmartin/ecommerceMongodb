const axios = require("axios");
const { Server } = require("socket.io");

const messages = [];
const urlProducts = "http://localhost:8080/api/products/?category=&priceMin=&priceMax=&sort=&limit=&page=";

const setUpSocket = (app) => {
  const io = new Server(app);

  io.on("connection", async (socket) => {
    console.log(`Cliente conectado con id: ${socket.id}`);
    // REAL TIME PRODUCTS
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
    // CHATS & LOGS
    socket.on("newUser", (user) => {
      socket.broadcast.emit("userConnected", user);
      socket.emit("messageLogs", messages);
    });

    socket.on("message", (data) => {
      messages.push(data);
      io.emit("messageLogs", messages);
    });
  });
};

module.exports = setUpSocket;
