import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    address: { type: String, required: true },
    coupon: { type: String },
    payment: { type: String, required: true },
    email: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Hoàn thành", "Đang xử lý", "Đã hủy"],
      default: "Đang xử lý",
    },
    productPay: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    phone: { type: String, required: true },
    saveInfo: { type: Boolean, default: false },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
