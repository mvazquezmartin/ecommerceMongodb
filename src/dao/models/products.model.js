const mongoose = require("mongoose");

const collectionName = "productos";

const collectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbanail: String,
  code: String,
  stock: Number,
  status: Boolean,
});

const Products = mongoose.model(collectionName, collectionSchema);

module.exports = Products;
