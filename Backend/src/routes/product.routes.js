import express from 'express';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from '../controllers/productController.js';
const router = express.Router();

router.post('/create-product', createProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/edit/:id' , updateProduct);
router.get('/:id', getOneProduct );
router.get('/', getProducts);


export default router;