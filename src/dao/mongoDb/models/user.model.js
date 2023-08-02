const mongoose = require("mongoose");

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    //require: true
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  age: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    //require:true,
  },
  phone: {
    type: String,
    //require:true,
  },
  role: {
    type: String,
    default: "user",
  },
  id_cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },  
});

userSchema.pre("find", function () {
  this.populate("carts");
});

userSchema.pre("find", function () {
  this.populate("own_prod");
});

const Users = mongoose.model(userCollection, userSchema);

module.exports = Users;
