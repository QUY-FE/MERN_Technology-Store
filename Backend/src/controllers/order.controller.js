import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const createAOrder = async (req, res) => {
  try {
    const { productPay, ...orderData } = req.body;
    if (!productPay || productPay.length === 0) {
      return res.status(400).json({ message: "Đơn hàng không có sản phẩm" });
    }

    for (const item of productPay) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Sản phẩm không tồn tại trong hệ thống` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Sản phẩm "${product.title}" chỉ còn ${product.quantity} sản phẩm trong kho`,
        });
      }
    }
    const newOrder = await Order.create({  ...orderData, productPay });
    const saveOrder = await newOrder.save();

    const bulkOptions = productPay.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: {
          $inc: {
            quantity: -item.quantity,
            totalBuy: item.quantity,
          },
        },
      },
    }));

    await Product.bulkWrite(bulkOptions);
    return res.status(200).json(saveOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi khi thanh toán" });
  }
};

export const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "Không tìm thấy" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};
export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch order" });
  }
};

// [UPDATE] - PUT /api/order/:id
export const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy order để cập nhật.' });
        }

        return res.status(200).json({ success: true, message: 'Cập nhật thành công.', data: updatedOrder });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi máy chủ.', error: error.message });
    }
};



// DELETE /delete/:id
export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    return res.json({ message: "Xoá thành công !!!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
