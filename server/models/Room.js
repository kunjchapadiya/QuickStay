const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,             // Deluxe Room
  price: Number,
  description: String,
  images: [String],
  maxGuests: Number,
});

module.exports = mongoose.model("Room", roomSchema);
