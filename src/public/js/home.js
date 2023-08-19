import { renderProductos } from "../js/render/productRender.js";

const url = "/api/products/?category=&priceMin=&priceMax=&sort=&limit=&page=";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    renderProductos(data.data.docs);
  })
  .catch((error) => {
    console.log("Error request ", error);
  });
