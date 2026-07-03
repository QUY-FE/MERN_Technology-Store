import Product from "../models/product.model.js";
import fs from "fs";
import path from "path";
// GET /products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /create-product
export const createProduct = async (req, res, next) => {
  try {
    const { gallery, ...data } = req.body;
    const newProduct = new Product({
      ...data,
      gallery: Array.isArray(gallery) ? gallery : gallery ? [gallery] : [],
    });

    const saveProduct = await newProduct.save();
    return res.status(201).json(saveProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /:id
export const getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Khong tim thay" });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT /edit/:id
export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { gallery, ...data } = req.body;

   
    const newGallery = Array.isArray(gallery) ? gallery : gallery ? [gallery] : [];

    
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    const oldGallery = existingProduct.gallery || [];
    const imagesToDelete = oldGallery.filter(oldImg => !newGallery.includes(oldImg));

    imagesToDelete.forEach((imageUrl) => {
      const filePath = path.join(process.cwd(), imageUrl);

      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (fileError) {
          console.error(`Không thể xóa file vật lý khi update: ${filePath}`, fileError);
        }
      }
    });

    const updateData = {
      ...data,
      gallery: newGallery,
    };
    
    const updated = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });
    
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /delete/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    if (product.gallery && product.gallery.length > 0) {
      product.gallery.forEach((imageUrl) => {
        const filePath = path.join(process.cwd(), imageUrl);

        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (fileError) {
            console.error(`Không thể xóa file vật lý: ${filePath}`, fileError);
          }
        }
      });
    }

    await Product.findByIdAndDelete(req.params.id);
    return res.json({ message: "Xoá thành công !!!" });
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
};
