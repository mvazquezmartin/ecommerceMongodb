import { renderProductos } from "../../src/productRender.js";

const socket = io();

socket.on("listProducts", (products) => {
    renderProductos(products);
});
