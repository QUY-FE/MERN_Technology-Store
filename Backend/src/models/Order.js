import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    username: {type: String, required: true},
    address:  {type: String, required: true},
    coupon: {type: String},
    payment: {type: String, required: true},
    email: { type: String, required: true},
    productIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    }],
    phone: {type: String, required: true},
    saveInfo: {type: String},
    totalPrice: {type: String, required: true},
},{timestamps: true});

const Order = mongoose.model("Order",orderSchema);
export default Order;