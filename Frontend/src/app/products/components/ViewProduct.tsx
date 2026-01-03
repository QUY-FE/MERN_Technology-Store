import Button from '#/components/Button'
import { useGetReviewsByProductQuery } from '#/redux/features/reviewsApi'
import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa'
import { FaRotate, FaTruckFast } from 'react-icons/fa6'






// Import Product type from ProductCard for consistency
import type { Product } from "./ProductCard";

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
  productId
}: ProductInfoProps) => {
  const { data: reviewsData } = useGetReviewsByProductQuery(productId);
  const reviews = reviewsData ?? [];
  return (
    <>
      {/* thông tin ở dạng mobile */}
      <div className="block lg:hidden flex-1 w-full px-2 pt-2">
          <h1 className="text-2xl font-bold mb-1">{product.title ?? "Không tải được"}</h1>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
              key={i}
              color={i < (product.countStar ?? 0)? "#ffad33" : "gray"}
              />
            ))}
            <span className="text-gray-500 text-sm">
              ({reviews.length > 0 ? reviews.length : 0} Đánh giá)
            </span>
            {product?.quantity > 0 ? (
              <span className="text-green-600 font-semibold ml-2">
                Còn hàng
              </span>
            ) : (
              <span className="text-red-500 font-semibold ml-2">Hết hàng</span>
            )}
          </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 ">
        {/* Left: Ảnh sản phẩm */}
        <div className="w-full lg:w-5/12 p-2 lg:p-4 flex flex-col items-center gap-4">
          <div className="w-[350px] h-[350px] bg-white flex items-center justify-center rounded-lg shadow">
            <Image
              src={product?.img ? `/${product.img}` : "/not_found.png"}
              alt={product?.title || "Sản phẩm"}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
          {/* Ảnh nhỏ (demo lặp lại ảnh chính) */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-16 h-16 bg-white rounded flex items-center justify-center border"
              >
                <Image
                  src={product?.img ? `/${product.img}` : "/not_found.png"}
                  alt={product?.title || "sản phẩm"}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Right: Thông tin sản phẩm */}
        <div className="flex-1 w-full  lg:w-7/12 px-2 lg:p-4">
          <h1 className="hidden lg:block text-2xl font-bold mb-2">{product.title ?? "Không tải được"}</h1>
          <div className="hidden lg:flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < (product.countStar ?? 0)? "#ffad33" : "gray"}
              />
            ))}
            <span className="text-gray-500 text-sm">
              ({reviews.length > 0 ? reviews.length : 0} Đánh giá)
            </span>
            {product?.quantity > 0 ? (
              <span className="text-green-600 font-semibold ml-2 hidden lg:block">
                Còn hàng
              </span>
            ) : (
              <span className="text-red-500 font-semibold ml-2 hidden lg:block">Hết hàng</span>
            )}
          </div>
          <div className="text-2xl font-bold text-primary mb-2">
            ${product.newPrice}
          </div>
          <div className="text-gray-500 line-through mb-4 italic">
            ${product.oldPrice}
          </div>

          {/* Số lượng + nút mua */}
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

          <div className="py-2 font-bold">
            <p>
              Số lượng :
              <span className="text-green-500"> {product?.quantity}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 my-4">
            <Button
              text="Thêm vào giỏ hàng"
              w={160}
              h={56}
              onClick={handleAddToCart}
            />

            <Button
              onClick={handleBuyProduct}
              text="Mua ngay"
              w={115}
              h={56}
              primary
            />
          </div>
          {/* Thông tin giao hàng */}
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
        <div className="font-bold text-lg mb-4 text-red-500 flex items-center gap-2">
          <span className="w-2 h-6 bg-red-500 rounded mr-2"></span>
           Chi tiết sản phẩm
        </div>
        
        <p className="mb-4 text-gray-700">{product.description}</p>
      </div>
    </>
  )
}

export default ViewProduct
