const mongoose = require("mongoose");

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
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
  profile_img: String,
  role: {
    type: String,
    default: "user",
  },
  id_cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: Date,
});

userSchema.pre("find", function () {
  this.populate("carts");
});

const Users = mongoose.model(userCollection, userSchema);

module.exports = Users;
