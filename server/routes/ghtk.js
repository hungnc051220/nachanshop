const express = require("express");
const router = express.Router();
const { getFee, createOrder, checkOrder } = require("../controllers/ghtk");

router.post("/", getFee);
router.post("/create-order", createOrder);
router.get("/check-order/:id", checkOrder);

module.exports = router;
