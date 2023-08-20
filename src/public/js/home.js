import { renderProductos } from "../js/render/productRender.js";
const btnFind = document.getElementById("btnMainFind");
const btnFilter = document.getElementById("btnFilter");

const url = "/api/products/?category=&priceMin=&priceMax=&sort=&limit=&page=";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    renderProductos(data.data.docs);
  })
  .catch((error) => {
    console.log("Error request ", error);
  });

btnFind.addEventListener("click", () => {
  const prodId = document.getElementById("prodId");
  const id = prodId.value;
  console.log(id);
  fetch(`/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      renderProductos(data.data);
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `No se encontro producto con el ID: ${id}`,
      });
    });
});

btnFilter.addEventListener("click", (e) => {
  e.preventDefault();
  const categorySelect = document.getElementById("category");
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");

  const category = categorySelect.value;
  const priceMin = minPriceInput.value;
  const priceMax = maxPriceInput.value;

  fetch(
    `/api/products/?category=${category}&priceMin=${priceMin}&priceMax=${priceMax}&sort=&limit=&page=`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "error") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `No se encontro producto`,
        });
      }
      renderProductos(data.data.docs);
    })
    .catch((error) => {
      console.log(error);
    });
});
