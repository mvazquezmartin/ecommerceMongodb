import { renderProductos } from "../../productRender.js";

const form = document.getElementById("login");
const url = "/api/products";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    renderProductos(data);
  })
  .catch((error) => {
    console.log("Error request ", error);
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  const url = "/auth";

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  form.innerHTML = "";
  const welcomeLabel = document.createElement("label");
  welcomeLabel.textContent = "Bienvenido";

  const logoutBtn = document.createElement("button");
  logoutBtn.classList.add("btn", "btn-warning");
  logoutBtn.textContent = "Logout";

  form.insertAdjacentElement("afterend", logoutBtn);
  form.insertAdjacentElement("afterend", welcomeLabel);
  logoutBtn.addEventListener("click", () => {
    fetch(`${url}/logout`);
  });
});
