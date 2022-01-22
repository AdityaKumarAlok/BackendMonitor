//Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

var CarInfo = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Flat: {
    type: String,
    required: true,
  },
  Apartment: {
    type: String,
    required: true,
  },
  Car: {
    type: String,
    required: true,
  },
});

// exporting Schemas from models
module.exports = mongoose.model("CarInfo", CarInfo);
