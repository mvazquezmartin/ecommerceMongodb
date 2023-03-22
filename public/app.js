import { renderProductos } from "../src/productRender.js";

const socket = io();

socket.on("productos", (productos) => {
  const listaProductos = document.getElementById("cardProductos");
  listaProductos.innerHTML = "";
  
  renderProductos(productos)
});

const formulario = document.getElementById("formulario-producto");
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  socket.emit("nuevoProducto", nombre);
});
