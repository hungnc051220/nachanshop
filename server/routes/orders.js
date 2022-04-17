const express = require("express");
const router = express.Router();
const { getOrders, getOrderById, addOrder, updateOrder } = require("../controllers/orders");

router.route("/").get(getOrders).post(addOrder);
router.route("/:id").get(getOrderById).patch(updateOrder);

module.exports = router;