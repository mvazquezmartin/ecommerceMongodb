export const inputRenderAddModify = () => {
  inputDatos.innerHTML = "";
  cardProductos.innerHTML = "";
  //reqProduct();
  //INPUT AGREGAR&MODIFICAR ESTRUCTURA
  const miNodo = document.createElement("form");
  miNodo.classList.add("d-flex", "flex-column", "my-1");
  miNodo.setAttribute("id", "formProducto")
  // TITULO ID
  const miNodoTitleId = document.createElement("div");
  miNodoTitleId.textContent = "ID";
  // INPUT ID
  const miNodoInputId = document.createElement("input");
  miNodoInputId.classList.add("mb-1");
  miNodoInputId.setAttribute("type", "number");
  miNodoInputId.setAttribute("name", "id");
  // TITULO NOMBRE PRODUCTO
  const miNodoTitleNombre = document.createElement("div");
  miNodoTitleNombre.textContent = "NOMBRE";
  // INPUT NOMBRE PRODUCTO
  const miNodoInputNombre = document.createElement("input");
  miNodoInputNombre.classList.add("mb-1");
  miNodoInputNombre.setAttribute("type", "text");
  miNodoInputNombre.setAttribute("name", "title");
  // TITULO PRECIO
  const miNodoTitlePrecio = document.createElement("div");
  miNodoTitlePrecio.textContent = "PRECIO";
  // INPUT PRECIO
  const miNodoInputPrecio = document.createElement("input");
  miNodoInputPrecio.classList.add("mb-1");
  miNodoInputPrecio.setAttribute("type", "text");
  miNodoInputPrecio.setAttribute("name", "price");
  // TITULO CANTIDAD
  const miNodoTitleCantidad = document.createElement("div");
  miNodoTitleCantidad.textContent = "CANTIDAD";
  // INPUT CANTIDAD
  const miNodoInputCantidad = document.createElement("input");
  miNodoInputCantidad.classList.add("mb-1");
  miNodoInputCantidad.setAttribute("type", "number");
  miNodoInputCantidad.setAttribute("name", "stock");
  // BTN AGREGAR
  const miNodoBtnAgregar = document.createElement("button");
  miNodoBtnAgregar.classList.add("m-1", "btn", "btn-info");
  miNodoBtnAgregar.setAttribute("type", "submit");
  miNodoBtnAgregar.setAttribute("value", "agregar");
  miNodoBtnAgregar.setAttribute("id", "btnAccionAgregar");
  miNodoBtnAgregar.textContent = "AGREGAR";
  // BTN MODIFiCAR
  const miNodoBtnModificar = document.createElement("button");
  miNodoBtnModificar.classList.add("m-1", "btn", "btn-warning");
  miNodoBtnModificar.setAttribute("type", "submit");
  miNodoBtnModificar.setAttribute("value", "Modificar");
  miNodoBtnModificar.setAttribute("id", "btnAccionModificar");
  miNodoBtnModificar.textContent = "MODIFICAR";
  //INSERTAR MINODO
  miNodo.appendChild(miNodoTitleId);
  miNodo.appendChild(miNodoInputId);
  miNodo.appendChild(miNodoTitleNombre);
  miNodo.appendChild(miNodoInputNombre);
  miNodo.appendChild(miNodoTitlePrecio);
  miNodo.appendChild(miNodoInputPrecio);
  miNodo.appendChild(miNodoTitleCantidad);
  miNodo.appendChild(miNodoInputCantidad);
  inputDatos.appendChild(miNodo);
}