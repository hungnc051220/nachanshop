const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductBySearch,
  addMultiProduct,
  deleteMutliProduct,
} = require("../controllers/products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.route("/search").get(getProductBySearch);
router
  .route("/")
  .get(getProducts)
  .post(upload.array("productImage", 10), addProduct);
router
  .route("/:id")
  .get(getProductById)
  .post(upload.array("productImage", 10), updateProduct)
  .delete(deleteProduct);

router.post("/multi", addMultiProduct);
router.post("/deleteMulti", deleteMutliProduct);

module.exports = router;
