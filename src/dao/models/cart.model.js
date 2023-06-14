const mongoose = require("mongoose");

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
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

const Carts = mongoose.model(cartCollection, cartSchema);

module.exports = Carts;
