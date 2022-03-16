const express = require("express");
const router = express.Router();
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require("../controllers/products");

router.route("/").get(getProducts).post(addProduct);
router.route("/:id").get(getProductById).patch(updateProduct).delete(deleteProduct);

module.exports = router;
