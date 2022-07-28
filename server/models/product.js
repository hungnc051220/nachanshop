const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productCode: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
  mainCategory: {
    type: String,
  },
  category: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  countInStock: {
    type: Number,
    default: 1,
  },
  status: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
  },
  productImage: Array,
  color: {
    type: Array,
  },
  weight: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
