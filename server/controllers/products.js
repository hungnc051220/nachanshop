const mongoose = require("mongoose");
const Product = require("../models/product");
const { downloadFile } = require("../download2");

const getProducts = async (req, res) => {
  const { page, mainCategory, category, subCategory, limit } = req.query;
  try {
    const LIMIT = limit || 25;
    const startIndex = (Number(page) - 1) * LIMIT;

    const dataSearch = {};
    if (mainCategory) dataSearch.mainCategory = mainCategory;
    if (category) dataSearch.category = category;
    if (subCategory) dataSearch.subCategory = subCategory;

    const products = await Product.find(dataSearch)
      .limit(LIMIT)
      .skip(startIndex);

    const total = await Product.find(dataSearch).count();

    res.status(200).json({
      currentPage: Number(page) || 1,
      pageSize: LIMIT,
      total,
      content: products,
    });
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

const getProductBySearch = async (req, res) => {
  const { name } = req.query;
  try {
    const nameProduct = new RegExp(name, "i");
    const products = await Product.find({ name: nameProduct });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  const product = req.body;

  const images = req.files.map((item) => {
    return item.path;
  });

  const newProduct = new Product({
    ...product,
    productImage: images,
  });

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

  let newProduct = { ...product };

  if (req?.files && req.files.length > 0) {
    const images = req.files.map((item) => {
      return item.path;
    });

    newProduct.productImage = images;
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send({ messsage: "Không có sản phẩm này" });

    const updatedProduct = await Product.findByIdAndUpdate(_id, newProduct, {
      new: true,
    });

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

const deleteMutliProduct = async (req, res) => {
  const products = req.body;

  try {
    await Product.deleteMany({ _id: { $in: products } });
    res.status(200).json({ message: "Xoá sản phẩm thành công" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addMultiProduct = async (req, res) => {
  const products = req.body;
  const newList = await Promise.all(
    products.map(async (item) => {
      const fileName = await downloadFile(item.productImages[0]);
      item.productImage = fileName;
      return item;
    })
  );

  try {
    const newListProduct = await Product.insertMany(newList);
    res.status(201).json(newListProduct);
  } catch (e) {
    print(e);
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductBySearch,
  addMultiProduct,
  deleteMutliProduct,
};
