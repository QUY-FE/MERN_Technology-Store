import express from 'express';
import { createReview, deleteReview, getAllReviews, getReviewByProductId, updateReview } from '../controllers/reviewController.js';
const router = express.Router();


router.post('/create-review', createReview);
router.get('/',getAllReviews);
router.put('/edit/:id' , updateReview);
router.delete('/delete/:id', deleteReview);
router.get('/:productId', getReviewByProductId);

export default router;