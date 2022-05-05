const express = require("express");
const router = express.Router();
const { getFee, createOrder } = require("../controllers/ghtk");

router.post("/", getFee);
router.post("/create-order", createOrder);

module.exports = router;
