import { inputRenderAddModify } from "../../src/inputRenderAddModify.js";
import { inputRenderfind } from "../../src/inputRenderFind.js";
import { renderProductos } from "../../src/productRender.js";

const socket = io();

const urlProducts = "/api/products/";

const btnMainFind = document.getElementById("btnMainFind");
const btnMainAdd = document.getElementById("btnMainAdd");
const btnMainMododify = document.getElementById("btnMainModify");
const btnMainDelete = document.getElementById("btnMainDelete");

const renderInputFind = () => {
  inputRenderfind(true);
  const btnBuscar = document.getElementById("btnAccionBuscar");
  const prodId = document.getElementById("prodId");
  btnBuscar.addEventListener("click", () => {
    const id = parseInt(prodId.value);
    fetch(`${urlProducts}${id}`)
      .then((response) => response.json())
      .then((data) => {
        renderProductos(data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `No se encontro producto con el ID: ${id}`,
        });
      });
  });
};

const renderInputAdd = () => {
  inputRenderAddModify(true);
  const newProductForm = document.getElementById("formProducto");
  newProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(newProductForm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));

    fetch(urlProducts, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(obj),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al agregar producto");
        Swal.fire({
          icon: "success",
          title: "Producto Agregado",
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Todos los campos son obligatorios",
        });
      });
  });
};

const renderInputModify = () => {
  inputRenderAddModify();

  const newProductForm = document.getElementById("formProducto");
  const prodId = document.getElementById("prodId");

  prodId.addEventListener("focusout", () => {
    const id = parseInt(prodId.value);
    fetch(`${urlProducts}${id}`)
      .then((response) => response.json())
      .then((data) => {
        const titleInput = document.querySelector('input[name="title"]');
        const descriptionInput = document.querySelector(
          'input[name="description"]'
        );
        const thumbnailInput = document.querySelector(
          'input[name="thumbnail"]'
        );
        const codeInput = document.querySelector('input[name="code"]');
        const priceInput = document.querySelector('input[name="price"]');
        const stockInput = document.querySelector('input[name="stock"]');

        titleInput.value = data.title;
        descriptionInput.value = data.description;
        thumbnailInput.value = data.thumbnail;
        codeInput.value = data.code;
        priceInput.value = data.price;
        stockInput.value = data.stock;
      })
      .catch(erro=>{
        Swal.fire({
          icon: "error",
          title: "No hay producto con ese ID",
        });
      })
  });

  newProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = parseInt(prodId.value);
    const data = new FormData(newProductForm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));

    fetch(`${urlProducts}${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(obj),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al agregar producto");
        Swal.fire({
          icon: "success",
          title: "Producto Agregado",
        });
      })
      .catch(error=>{
        Swal.fire({
          icon: "error",
          title: "Todos los campos son obligatorios",
        });        
      })
  });
};

const renderInputDelete = () => {
  inputRenderfind();
  const btnBorrar = document.getElementById("btnAccionBorrar");
  const prodId = document.getElementById("prodId");
  btnBorrar.addEventListener("click", (e) => {
    e.preventDefault();
    const id = parseInt(prodId.value);
    fetch(`${urlProducts}${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al agregar producto");
        Swal.fire({
          icon: "success",
          title: "Producto Eliminado",
        });
      })
      .catch(error=>{
        Swal.fire({
          icon: "error",
          title: `No se encontro producto con ID: ${id}`,
        });        
      })
  });
};

btnMainFind.addEventListener("click", renderInputFind);
btnMainAdd.addEventListener("click", renderInputAdd);
btnMainMododify.addEventListener("click", renderInputModify);
btnMainDelete.addEventListener("click", renderInputDelete);

socket.on("listProducts", (products) => {
  renderProductos(products);
});
