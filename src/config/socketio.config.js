const axios = require("axios");
const { Server } = require("socket.io");
const chatService = require("../service/chat.service");

// const urlProducts =
//   "http://localhost:8080/api/products/?category=&priceMin=&priceMax=&sort=&limit=&page=";

const setUpSocket = (app) => {
  const io = new Server(app);

  io.on("connection", async (socket) => {
    console.log(`Cliente conectado con id: ${socket.id}`);
    // REAL TIME PRODUCTS
    // socket.on("limit", (value) => {
    //   axios
    //     .get(`${urlProducts}${value}`)
    //     .then((response) => {
    //       const product = response.data;
    //       socket.emit("listProducts", product);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });
    // CHATS & LOGS
    socket.on("newUser", async (user) => {
      socket.broadcast.emit("userConnected", user);
      const messages = await chatService.getAll();
      socket.emit("messageLogs", messages.data);
    });

    socket.on("message", async (data) => {
      await chatService.create(data);
      const messages = await chatService.getAll();
      io.emit("messageLogs", messages.data);
    });
  });
};

module.exports = setUpSocket;
