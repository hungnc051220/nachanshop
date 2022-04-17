const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

const getDashboard = async (req, res) => {
  try {
    const orderCount = await Order.find().count();
    const productCount = await Product.find().count();
    const userCount = await User.find().count();
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]);
    const orderByStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $count: {}
          }
        },
      },
      { $sort : {"_id": 1}},
    ])

    const report = await Order.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          total: { $sum: "$total" },
        },
      },
      { $sort : { "_id.month" : 1, "_id.year": -1 } },
    ]);

    res
      .status(200)
      .json({
        orderCount,
        productCount,
        userCount,
        total: revenue[0]?.total || 0,
        report,
        orderByStatus
      });
  } catch (error) {
    res.status(404).json({ messsage: error.message });
  }
};

module.exports = {
  getDashboard,
};
