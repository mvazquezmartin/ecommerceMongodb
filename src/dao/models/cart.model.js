const mongoose = require("mongoose");

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
      },
    ],
    default: [],
  },
});

collectionSchema.pre("find", function () {
  this.populate("products.product");
});
const Carts = mongoose.model(cartCollection, cartSchema);

module.exports = Carts;
