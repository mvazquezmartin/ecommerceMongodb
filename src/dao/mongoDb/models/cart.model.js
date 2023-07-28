const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productos",
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
    default: [],
  },
});

cartSchema.pre("find", function () {
  this.populate("products.product");
});

cartSchema.plugin(mongoosePaginate);

const Carts = mongoose.model(cartCollection, cartSchema);

module.exports = Carts;
