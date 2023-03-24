import { renderProductos } from "../../src/productRender.js";

const socket = io();

socket.on("msj", (res) => {
  console.log(res);
});

socket.on("listProducts", (products) => {
    renderProductos(products);
});
