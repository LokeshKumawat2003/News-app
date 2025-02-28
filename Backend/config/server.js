const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const getDb = () => {
  try {
    mongoose.connect(process.env.URI);
    console.log("DB is Runing");
  } catch (error) {
    console.log("DB Not Connect");
  }
};
module.exports = getDb;
