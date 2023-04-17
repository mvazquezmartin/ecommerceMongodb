const mongoose = require("mongoose");

const collectionName = "carts";

const collectionSchema = new mongoose.Schema({
  productos:[{
    _id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos"
    },
    quantity:{
      type: Number,
      require:true,
      min: 1,
    }
  }]
});

const Carts = mongoose.model(collectionName, collectionSchema);

module.exports = Carts;
