const form = document.getElementById("login");

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
    .then((data) => {
      if (data.error == "Failed login") {
        return alert("Error");
      } else {
        form.innerHTML = "";
        const welcomeLabel = document.createElement("label");
        welcomeLabel.textContent = `Bienvenido ${data.name}`;

        const logoutBtn = document.createElement("button");
        logoutBtn.classList.add("btn", "btn-warning", "mx-3");
        logoutBtn.textContent = "Logout";

        form.insertAdjacentElement("afterend", logoutBtn);
        form.insertAdjacentElement("afterend", welcomeLabel);
        logoutBtn.addEventListener("click", () => {
          fetch(`${url}/logout`).catch((error) => console.log(error));
        });
      }
    })
    .catch((error) => console.log(error));
});
