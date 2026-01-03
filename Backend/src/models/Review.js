import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    username: { type: String, required: true  },
    email: { type: String, required: true  },
    rating: { type: Number, required: true, default: 0 },
    comment: { type: String, required: true  },
},{timestamps: true});

const Review = mongoose.model('Review', reviewSchema);
export default Review;