export const renderProductos = (data) => {
  const cardProducto = document.getElementById("cardProductos");
  cardProducto.innerHTML = "";
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
    // CATEGORY PRODUCT
    const miNodoCategory = document.createElement("p");
    miNodoCategory.classList.add("cart-text");
    miNodoCategory.textContent = `CATEGORY: ${producto.category}`;
    //DESCRIPTION
    const miNodoDescription = document.createElement("p");
    miNodoDescription.classList.add("card-text");
    miNodoDescription.textContent = producto.description;
    //PRECIO
    const miNodoPrecio = document.createElement("p");
    miNodoPrecio.classList.add("card-text");
    miNodoPrecio.textContent = `Precio unitario: $${producto.price}`;
    //UNIDADES
    const miNodoUnidades = document.createElement("p");
    miNodoUnidades.classList.add("card-text");
    miNodoUnidades.textContent = `Unidades: ${producto.stock}`;
    //BTN CART
    const miNodoBtnCart = document.createElement("a");
    miNodoBtnCart.classList.add("btn", "btn-primary");
    miNodoBtnCart.setAttribute("href", "#");
    miNodoBtnCart.textContent = "Add Cart";
    //INSERTAR MINODO
    miNodo.appendChild(miNodoImg);
    miNodo.appendChild(miNodoBodyCard);
    miNodoBodyCard.appendChild(miNodoTitle);
    miNodoBodyCard.appendChild(miNodoId);
    miNodoBodyCard.appendChild(miNodoCategory);
    miNodoBodyCard.appendChild(miNodoDescription);
    miNodoBodyCard.appendChild(miNodoUnidades);
    miNodoBodyCard.appendChild(miNodoPrecio);
    miNodoBodyCard.appendChild(miNodoBtnCart);
    cardProducto.appendChild(miNodo);
  });
};
