const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    total: Number,
    shippingFee: Number,
    cartItems: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    status: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
