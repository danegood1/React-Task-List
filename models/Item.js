const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  title: String,
  desc: String,
  start_date: { type: Date, default: Date.now },
  end_date: { type: Date }
});

module.exports = Item = mongoose.model("item", ItemSchema);
