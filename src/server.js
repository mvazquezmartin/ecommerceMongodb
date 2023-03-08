const express = require("express");
const ProductManager = require("./productManager");
const file = "../file/data.json";
const app = express();
const port = 3000;
const productManager = new ProductManager(file);

app.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts();
  if (!limit || isNaN(limit)) {
    res.json(products);
  } else {
    res.json(products.slice(0, limit));
  }
});

app.get("/products/:pid", async (req, res) => {
  const id = parseInt(req.params.pid)
  const product = await productManager.getProductById(id);  
  if (product) {
    res.json(product);
  } else {
    res.status(404)
    res.send('<img src="https://http.cat/404">')
  }
});

/* app.delete("/products/:pid", async (req, res) => {
  const id = req.params.pid;
  try {
    await productManager.deleteProduct(id);
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500)
    res.send('<img src="https://http.cat/500">')
  }
}); */

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
