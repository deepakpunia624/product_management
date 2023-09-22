const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  isActive: {
    type: Boolean,
  },
});
productSchema.set("timestamps", true);
module.exports = mongoose.model("product", productSchema);
