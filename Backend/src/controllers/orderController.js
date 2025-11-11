import Order from "../models/Order.js";

export const createAOrder = async(req,res) => {
    try {
        const newOrder = await Order(req.body);
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Lỗi khi thanh toán"});
    }
}

export const getOrderByEmail = async(req,res) => {
    try {
        const {email} = req.params;
        const orders = await Order.find({email}).sort({createdAt: -1})
        if(!orders || orders.length === 0) {
           return res.status(404).json({ message: "Không tìm thấy"});
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to fetch order"});
    }
}