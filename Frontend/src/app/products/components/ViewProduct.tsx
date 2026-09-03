import { useState } from "react";
import Image from "next/image";

import { useGetReviewsByProductQuery } from "#/redux/features/reviewsApi";
import type { Product } from "#/types";
import getImageUrl from "#/utils/getImageUrl";

import { FaStar } from "react-icons/fa";
import { FaRotate, FaTruckFast } from "react-icons/fa6";
import { CheckCircle2, ShoppingCart, Tag, XCircle } from "lucide-react";

interface ProductInfoProps {
  product: Product;
  quantity: number;
  increase: () => void;
  decrease: () => void;
  handleAddToCart: () => void;
  handleBuyProduct: () => void;
  productId: string;
}

const ViewProduct = ({
  product,
  quantity,
  increase,
  decrease,
  handleAddToCart,
  handleBuyProduct,
  productId,
}: ProductInfoProps) => {
  const { data: reviewsData } = useGetReviewsByProductQuery(productId);
  const reviews = reviewsData ?? [];

  const [mainImage, setMainImage] = useState<string>(
    product.gallery?.[0] || "",
  );

  return (
    <>
      <div className="block lg:hidden flex-1 w-full px-2 pt-2">
        <h1 className="text-2xl font-bold mb-1">
          {product.title ?? "Không tải được"}
        </h1>
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              color={i < (product.countStar ?? 0) ? "#ffad33" : "gray"}
            />
          ))}
          <span className="text-gray-500 text-sm">
            {reviews.length > 0 ? reviews.length : 0} Đánh giá
          </span>
          {product?.quantity > 0 ? (
            <span className="text-green-600 font-semibold ml-2">Còn hàng</span>
          ) : (
            <span className="text-red-500 font-semibold ml-2">Hết hàng</span>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 ">
        <div className="w-full lg:w-5/12 p-2 lg:p-4 flex flex-col items-center gap-4">
          <div className="w-[350px] h-[350px] bg-white flex items-center justify-center rounded-lg shadow relative overflow-hidden">
            <Image
              src={getImageUrl(mainImage)}
              alt={product?.title || "Sản phẩm"}
              fill
              className="object-contain p-2"
            />
          </div>
          <div className="flex gap-2">
            {product.gallery?.map((img) => (
              <div
                key={img}
                className={`w-16 h-16 bg-white rounded flex items-center justify-center border cursor-pointer relative overflow-hidden ${mainImage === img ? "ring-[1px] ring-primary" : ""}`}
                onClick={() => setMainImage(img)}
                title="Xem ảnh này"
              >
                <Image
                  src={getImageUrl(img)}
                  alt={product?.title}
                  fill
                  className="object-contain p-1"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full  lg:w-7/12 px-2 lg:p-4">
          <h1 className="hidden lg:block text-2xl font-bold mb-2">
            {product.title ?? "Không tải được"}
          </h1>
          <div className="hidden lg:flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full tracking-wider flex items-center gap-1">
              <Tag size={12} />
              {product.category}
            </span>
            <span className="text-gray-500 text-sm">
              Đã bán: {product.totalBuy || 0}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-red-500 mb-1">
              {product.price?.toLocaleString()}$
            </div>
          </div>

          <div className="flex items-center gap-2 my-4">
            <button
              className="px-3 py-1 border rounded"
              onClick={decrease}
              aria-label="Decrease quantity"
            >
              -
            </button>

            <span className="px-3 font-medium">{quantity}</span>

            <button
              className="px-3 py-1 border rounded"
              onClick={increase}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="py-2 flex items-center gap-1">
            <p className="text-gray-500">
              Số lượng kho: {product?.quantity || 0}
            </p>
            {product?.quantity > 0 ? (
              <span className="lg:flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-600 ml-2 hidden">
                <CheckCircle2 size={16} />
                Còn hàng
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold ml-2 hidden lg:flex items-center gap-1">
                <XCircle size={16} />
                Hết hàng
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 my-4">
            <button
              className="cst_btn-secondary-icon "
              onClick={handleAddToCart}
              disabled={product?.quantity <= 0}
            >
              Thêm vào giỏ hàng
              <ShoppingCart size={20} />
            </button>
            <button
              className="cst_btn-primary"
              onClick={handleBuyProduct}
              disabled={product?.quantity <= 0}
            >
              Mua ngay
            </button>
          </div>
          <div className="border rounded p-4 mb-2 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold flex items-center gap-3">
                <FaTruckFast size={25} className="text-primary" /> Miễn phí ship
              </span>
              <span className="text-gray-500 text-sm">
                Nhập địa chỉ để đơn hàng đến nhanh nhất
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold flex items-center gap-3">
                <FaRotate size={25} className="text-primary" /> Chính sách đổi
                trả
              </span>
              <span className="text-gray-500 text-sm">
                Hoàn hàng trong vòng 30 ngày
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* chi tiết sản phẩm */}
      <div className="p-2  border-t-2 border-gray-200">
        <div className="font-bold text-lg mb-4 text-primary flex items-center gap-2">
          Chi tiết sản phẩm
        </div>
        <div className="text-gray-600 leading-relaxed whitespace-pre-line text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
          {product.description || ""}
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
