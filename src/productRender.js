const cardProducto = document.getElementById("cardProductos");
export const renderProductos = (data) => {
  const reqData = Array.isArray(data) ? data : [data];
  reqData.forEach((producto) => {
    //ESTRUCTURA
    const miNodo = document.createElement("div");
    miNodo.classList.add("card", "m-1", "rounded-3", "border", "border-3");
    miNodo.style.width = "16rem";
    //IMAGEN
    const miNodoImg = document.createElement("img");
    miNodoImg.classList.add(
      "img-fluid",
      "rounded-3",
      "rounted-top",
      "border-bottom",
      "border-2"
    );
    const imgProd = producto.thumbnail;
    miNodoImg.setAttribute("src", imgProd);
    miNodoImg.setAttribute("alt", producto.title);
    //BODYCARD
    const miNodoBodyCard = document.createElement("div");
    miNodoBodyCard.classList.add("card-body");
    //TITULOCARD
    const miNodoTitle = document.createElement("h5");
    miNodoTitle.classList.add("cartd-title");
    miNodoTitle.textContent = `${producto.title}`;
    //ID PRODUCTO
    const miNodoId = document.createElement("p");
    miNodoId.classList.add("card-text");
    miNodoId.textContent = `PROD ID: ${producto.id}`;
    //PRECIO
    const miNodoPrecio = document.createElement("p");
    miNodoPrecio.classList.add("card-text");
    miNodoPrecio.textContent = `Precio unitario: $${producto.price}`;
    //UNIDADES
    const miNodoUnidades = document.createElement("p");
    miNodoUnidades.classList.add("card-text");
    miNodoUnidades.textContent = `Unidades: ${producto.stock}`;
    //INSERTAR MINODO
    miNodo.appendChild(miNodoImg);
    miNodo.appendChild(miNodoBodyCard);
    miNodoBodyCard.appendChild(miNodoTitle);
    miNodoBodyCard.appendChild(miNodoId);
    miNodoBodyCard.appendChild(miNodoUnidades);
    miNodoBodyCard.appendChild(miNodoPrecio);
    cardProducto.appendChild(miNodo);
  });
};