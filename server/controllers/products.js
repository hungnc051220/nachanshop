const mongoose = require("mongoose");
const Product = require("../models/product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ messsage: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(404).send({ message: "Không có sản phẩm này" });
    }
    const product = await Product.findById(_id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  const product = req.body;
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send({ messsage: "Không có sản phẩm này" });

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { ...product, _id },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).json({ message: "Không có sản phẩm này" });

    await Product.findByIdAndRemove(_id);
    res.status(200).json({ message: "Xoá sản phẩm thành công" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
