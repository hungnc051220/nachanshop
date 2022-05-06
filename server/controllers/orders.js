const mongoose = require("mongoose");
const Order = require("../models/order");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ messsage: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(404).send({ message: "Không có đơn hàng này" });
    }
    const order = await Order.findById(_id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addOrder = async (req, res) => {
  const order = req.body;
  const newOrder = new Order(order);

  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  const { id: _id } = req.params;
  const order = req.body;
  
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send({ messsage: "Không có đơn hàng này" });

    const updatedOrder = await Order.findByIdAndUpdate(_id, order, {
      new: true,
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
};
