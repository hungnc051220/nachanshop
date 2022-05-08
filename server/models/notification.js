const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    name: String,
    total: Number,
    mark: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
