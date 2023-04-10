const mongoose = require("mongoose");

const collectionName = "productos";

const collectioSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbanail: String,
  code: String,
  stock: Number,
  status: Boolean,
});

const Products = mongoose.model(collectionName, collectioSchema);

module.exports = Products;
