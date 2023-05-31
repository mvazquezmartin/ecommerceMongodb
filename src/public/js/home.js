import { renderProductos } from "../js/render/productRender.js";

const url = "/api/products";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    renderProductos(data);
  })
  .catch((error) => {
    console.log("Error request ", error);
  });