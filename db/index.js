const mongoose = require("mongoose");
const { dbAdmin, dbPassword, dbHost } = require("../src/config/db.config");

const url = `mongodb+srv://${dbAdmin}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority`;

const mongoConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoConnect;
