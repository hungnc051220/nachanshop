const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    province: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    ward: {
      type: String,
      require: true,
    },
    total: Number,
    shippingFee: Number,
    realShippingFee: Number,
    cartItems: [
      {
        _id: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    status: Number,
    orderIdGHTK: String,
    orderGHTK: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
