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
    // gallery là mảng string, img là ảnh chính
    const { gallery, ...rest } = req.body;
    const newProduct = new Product({
      ...rest,
      gallery: Array.isArray(gallery) ? gallery : (gallery ? [gallery] : [])
    });
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
    const { gallery, ...rest } = req.body;
    const updateData = {
      ...rest,
      gallery: Array.isArray(gallery) ? gallery : (gallery ? [gallery] : [])
    };
    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
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