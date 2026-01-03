"use client";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "#/context/authContext";
import { useCreateReviewMutation, useGetReviewsByProductQuery } from "#/redux/features/reviewsApi";
import { toast } from "react-toastify";

// 1. Định nghĩa Interface rõ ràng
interface IReview {
  _id: string;
  productId: string;
  username: string;
  email: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

interface IReviewForm {
  rating: number;
  comment: string;
}

const ReviewProduct = ({ productId }: { productId: string }) => {
  // Lấy dữ liệu với Type đã định nghĩa (RTK Query tự hiểu reviews là IReview[])
  const { data: reviews = [] } = useGetReviewsByProductQuery(productId) as { data: IReview[] };
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();
  const { user } = useAuth(); // Interface của User thường đã có sẵn trong AuthContext

  // 2. Kiểm tra email - Gọn, Type-safe
  const hasReviewed = reviews.some((rv: IReview) => rv.email === user?.email);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IReviewForm>({
    defaultValues: { rating: 5, comment: "" },
  });

  const currentRating = watch("rating");

  const onSubmit: SubmitHandler<IReviewForm> = async (data) => {
    if (hasReviewed) return toast.error("Bạn đã gửi đánh giá cho sản phẩm này.");
    if (!user?.email) return toast.warning("Vui lòng đăng nhập để đánh giá.");

    try {
      // Gửi dữ liệu lên API với type bảo vệ
      await createReview({
        productId,
        // Chuyển null thành undefined để khớp với kiểu dữ liệu của API
        username: user.username ?? undefined, 
        email: user.email ?? undefined,
        rating: data.rating,
        comment: data.comment,
      }).unwrap();  

      toast.success("Cảm ơn bạn đã đánh giá!");
      reset();
    } catch (err) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div className="p-2 mt-10 max-w-4xl">
      <div className="font-bold text-lg mb-4 text-red-500 flex items-center gap-2">
        <span className="w-2 h-6 bg-red-500 rounded"></span>
        Đánh giá ({reviews.length})
      </div>

      {/* List Reviews */}
      <div className="space-y-4 mb-8">
        {reviews.length > 0 ? (
          reviews.map((review: IReview) => (
            <div key={review._id} className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                <Image src="/men_avatar.jpg" alt="avatar" width={40} height={40} className="rounded-full border" />
                <div>
                  <div className="font-semibold text-sm text-gray-800">{review.username}</div>
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} size={12} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic py-4">Chưa có đánh giá nào cho sản phẩm này.</p>
        )}
      </div>

      {/* Form Section */}
      {user ? (
        hasReviewed ? (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-500 italic text-sm">
            Bạn đã gửi đánh giá cho sản phẩm này. Cảm ơn ý kiến đóng góp của bạn!
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 rounded-xl border shadow-sm space-y-4">
            <h3 className="font-bold text-gray-800">Viết đánh giá của bạn</h3>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Mức độ hài lòng:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setValue("rating", star)}
                    className="transition transform active:scale-90"
                  >
                    <FaStar size={26} color={star <= currentRating ? "#ffad33" : "#e4e5e9"} />
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <textarea
                {...register("comment", { required: "Nội dung đánh giá không được để trống" })}
                className={`w-full h-32 p-3 rounded-lg bg-gray-50 border outline-none transition ${
                  errors.comment ? "border-red-400 focus:ring-1 focus:ring-red-100" : "border-gray-200 focus:border-red-400"
                }`}
                placeholder={`Chào ${user.username}, bạn thấy sản phẩm này thế nào?`}
              />
              {errors.comment && (
                <span className="text-red-500 text-xs italic absolute -bottom-5 left-0">
                  *{errors.comment.message}
                </span>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-md font-medium transition disabled:bg-gray-300"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
              </button>
            </div>
          </form>
        )
      ) : (
        <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm border border-red-100">
          Vui lòng <strong>Đăng nhập</strong> để viết đánh giá cho sản phẩm này.
        </div>
      )}
    </div>
  );
};

export default ReviewProduct;