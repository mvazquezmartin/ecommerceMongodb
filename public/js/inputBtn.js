import { inputRenderAddModify } from "../../src/inputRenderAddModify.js";
import { inputRenderfind } from "../../src/inputRenderFind.js";
import { renderProductos } from "../../src/productRender.js";

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
        const descriptionInput = document.querySelector('input[name="description"]');
        const thumbnailInput = document.querySelector('input[name="thumbnail"]');
        const codeInput = document.querySelector('input[name="code"]');
        const priceInput = document.querySelector('input[name="price"]');
        const stockInput = document.querySelector('input[name="stock"]');

        titleInput.value = data.title;
        descriptionInput.value = data.description;
        thumbnailInput.value = data.thumbnail;
        codeInput.value = data.code;
        priceInput.value = data.price;
        stockInput.value = data.stock;
      });
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
    });
  });
};

const renderInputDelete = () => {
  inputRenderfind();
  const btnBorrar = document.getElementById("btnAccionBorrar");
  const prodId = document.getElementById("prodId");
  btnBorrar.addEventListener("click", (e) => {
    e.preventDefault();
    const id = parseInt(prodId.value);
    console.log(id);
    fetch(`${urlProducts}${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  });
};

btnMainFind.addEventListener("click", renderInputFind);
btnMainAdd.addEventListener("click", renderInputAdd);
btnMainMododify.addEventListener("click", renderInputModify);
btnMainDelete.addEventListener("click", renderInputDelete);
