import Review from "../models/Review.js";

export const createReview = async (req, res, next) => {
  try {
    const existing = await Review.findOne({
      productId: req.body.productId,
      email: req.body.email,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Bạn đã đánh giá sản phẩm này rồi." });
    }

    const newReview = new Review(req.body);
    const saveReview = await newReview.save();

    res.status(201).json({ saveReview, message: "Tạo review thành công" });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo review",
      err: error.message,
    });
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const Reviews = await Review.find();
    if (!Reviews) return res.status(404).json({ message: "Khong tim thay" });
    res.status(201).json(Reviews);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy review",
      err: error.message,
    });
  }
};

export const getReviewByProductId = async (req, res, next) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    if (!reviews) return res.status(404).json({ message: "Khong tim thay" });
    res.status(201).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy review",
      err: error.message,
    });
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Xoá review thành công !!!" });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xoá review",
      err: error.message,
    });
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật review",
      err: error.message,
    });
  }
};
