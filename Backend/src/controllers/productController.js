import Product from "../models/Product.js";

// GET /products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /create-product
export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    res.status(201).json(saveProduct)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

// GET /:id
export const getOneProduct = async  (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({message: 'Khong tim thay'});
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// PUT /edit/:id
export const updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body,{ new: true});
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// DELETE /delete/:id
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({message: 'Xoá thành công !!!'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}