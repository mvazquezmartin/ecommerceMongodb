const express = require("express");
const cartRouter = require("../routes/cart.router");
const productsRouter = require("../routes/products.router");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter)

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
