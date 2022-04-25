const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  sku: {
    type: String,
  },
  title: {
    type: String,
    require: true,
  },
  typeParentValue: {
    type: String,
    require: true,
  },
  typeParentName: {
    type: String,
  },
  typeChildValue: {
    type: String,
  },
  typeChildName: {
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
    type: String,
  },
  weight: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
