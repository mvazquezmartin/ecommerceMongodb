import { inputRenderAddModify } from "../../src/inputRenderAddModify.js";
import { inputRenderfind } from "../../src/inputRenderFind.js";
import { renderProductos } from "../../src/productRender.js";

const btnMainFind = document.getElementById("btnMainFind");
const btnMainAdd = document.getElementById("btnMainAdd");
const btnMainMododify = document.getElementById("btnMainModify");
const btnMainDelete = document.getElementById("btnMainDelete");

const socket = io();

const renderProducts = () =>{
} 

const renderInputFind = () => {
  inputRenderfind();
  socket.on("msj", (res) =>{
    console.log(res)
  })
};

const renderInputAdd = () => {
  inputRenderAddModify();
};

const renderInputModify = () => {
  inputRenderAddModify();
};

const renderInputDelete = () => {
  inputRenderfind();
};

socket.on("productos", (productos) => {
  const listaProductos = document.getElementById("cardProductos");
  listaProductos.innerHTML = "";

  renderProductos(productos);
});

btnMainFind.addEventListener("click", renderInputFind);
btnMainAdd.addEventListener("click", renderInputAdd);
btnMainMododify.addEventListener("click", renderInputModify);
btnMainDelete.addEventListener("click", renderInputDelete);

// const formulario = document.getElementById("formulario-producto");
// formulario.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const nombre = document.getElementById("nombre").value;
//   socket.emit("nuevoProducto", nombre);
// });
