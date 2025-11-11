import mongoose from "mongoose";

const productShema = new mongoose.Schema({
    title: {type: String ,require:true},
    slug: { type: String, require: true},
    url: {type: String},
    newPrice: { type: Number, require: true},
    oldPrice: {type:Number},
    countStar: {type:Number, default: 0},
    totalBuy: {type:Number,default: 0},
    salePercent: {type:Number,default: 0},
    category: {type: String, require:true},
    description: {type: String, require:true},
},{timestamps: true});

const Product = mongoose.model('Product',productShema);

export default Product;
