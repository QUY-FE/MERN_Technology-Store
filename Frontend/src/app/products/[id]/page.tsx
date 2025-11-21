"use client";
import { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

import Button from "#/components/Button";
import { FaRotate } from "react-icons/fa6";
import { FaTruckFast } from "react-icons/fa6";
import { useAuth } from "#/context/authContext";
import { useAppDispatch } from "#/hooks/redux.hook";
import { addToCart } from "#/redux/features/cartSlice";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import {
  useGetAllProductQuery,
  useGetOneProductQuery,
} from "#/redux/features/productApi";
export default function Product() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: product,isLoading , isError } = useGetOneProductQuery(id);
  const { data: products = [] } = useGetAllProductQuery(undefined);
  const { user } = useAuth();
  const router = useRouter();
  
  // <-- added quantity state & handlers
  const [quantity, setQuantity] = useState<number>(1);
  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  // <-- end added

  if (isLoading) return <h1 className="h-screen text-center text-3xl py-20">Loading...!</h1>;
  if (isError || !product) return <h1 className="h-screen text-center text-3xl py-20">Không tìm thấy sản phẩm</h1>;

  const related = products.filter(
  (p) => p.category === product.category && p._id !== product._id
);

const anotherProducts = products.filter(
  (p) => p._id !== product._id && p.category !== product.category
);


  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.title,
        price: product.newPrice,
        quantity,
        image: product.img ?? "/defauft.jpg",
      })
    );
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  const handleBuyProduct = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    dispatch(
      addToCart({
        id: product._id,
        name: product.title,
        price: product.newPrice,
        quantity,
        image: product.img ?? "/defauft.jpg",
      })
    );
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
    router.push("/products/checkout");
  };

  return (
    <section className="max-w-[1200px] mx-auto pb-10 ">
      <div className="flex flex-col md:flex-row gap-10 ">
        {/* Left: Ảnh sản phẩm */}
        <div className="w-5/12 p-4 flex flex-col items-center gap-4">
          <div className="w-[350px] h-[350px] bg-white flex items-center justify-center rounded-lg shadow">
            <Image
              src={`/${product?.img}` || "/not_found.png"}
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
                  src={`/${product?.img}` || "/not_found.png"}
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
        <div className="flex-1 w-7/12 p-4">
          <h1 className="text-2xl font-bold mb-2">{product.title ?? "Không tải được"}</h1>
          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < (product.countStar ?? 0)? "#ffad33" : "gray"}
              />
            ))}
            <span className="text-gray-500 text-sm">
              ({product.totalBuy ?? 0} Đánh giá)
            </span>
            {product?.quantity > 0 ? (
              <span className="text-green-600 font-semibold ml-2">
                Còn hàng
              </span>
            ) : (
              <span className="text-red-500 font-semibold ml-2">Hết hàng</span>
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
      <div className="py-4 border-t-2 border-gray-300">
        <h1 className="text-2xl my-4 font-bold text-primary">
          Chi tiết sản phẩm
        </h1>
        <p className="mb-4 text-gray-700">{product.description}</p>
      </div>

      {/* Related items */}
      <div className="mt-12">
        <div className="font-bold text-lg mb-4 text-red-500 flex items-center gap-2">
          <span className="w-2 h-6 bg-red-500 rounded mr-2"></span>
          Sản phẩm liên quan
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {related.slice(0, 24).map((product) => (
            <article
              key={product?._id}
              className="relative w-full rounded-xl shadow-lg bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
            >
              <Link
                href={`/products/${product._id}`}
                className="absolute inset-0 z-20"
              ></Link>
              <div className="relative w-full h-[190px] bg-white flex items-center justify-center overflow-hidden">
                <Image
                  src={`/${product.img}` || "/not_found.png"}
                  alt={product.title || "Sản phẩm"}
                  fill
                  className="object-contain p-3 transition-all duration-300 group-hover:scale-105"
                />
              </div>
                  {/* Badge giảm giá */}
               {/* Kiểm tra: Có giá cũ VÀ giá cũ > (giá mới hoặc 0) */}
                {product.oldPrice &&
                  product.oldPrice > (product.newPrice ?? 0) && (
                    <span className="absolute top-3 left-3 px-3 py-[3px] bg-[#e34646] text-white rounded-md text-sm font-semibold shadow">
                      -
                      {Math.round(
                        // Dùng (product.newPrice ?? 0) để tránh trừ cho undefined ra NaN
                        ((product.oldPrice - (product.newPrice ?? 0)) /
                          product.oldPrice) *
                          100
                      )}
                      %
                    </span>
                  )}
              <div className="px-4 pb-4 pt-2">
                <h2 className="text-base font-medium h-[42px] line-clamp-2">
                  {product.title}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-lg font-semibold text-[#e34646]">
                    ${product.newPrice}
                  </p>
                  <p className="text-sm font-medium text-black/60 line-through italic">
                    ${product.oldPrice}
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={16}
                      color={i < product.countStar! ? "#ffad33" : "#d1d1d1"}
                    />
                  ))}
                  <span className="ml-3 text-sm text-black/60 font-medium">
                    ({product.totalBuy})
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {/* another products */}
      <div className="mt-12">
        <div className="font-bold text-lg mb-4 text-red-500 flex items-center gap-2">
          <span className="w-2 h-6 bg-red-500 rounded mr-2"></span>
          Sản phẩm khác
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {anotherProducts.slice(0, 24).map((product) => (
            <article
              key={product?._id}
              className="relative w-full rounded-xl shadow-lg bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
            >
              <Link
                href={`/products/${product._id}`}
                className="absolute inset-0 z-20"
              ></Link>
              <div className="relative w-full h-[190px] bg-white flex items-center justify-center overflow-hidden">
                <Image
                  src={`/${product.img}` || "/not_found.png"}
                  alt={product.title || "Sản phẩm"}
                  fill
                  className="object-contain p-3 transition-all duration-300 group-hover:scale-105"
                />
              </div>
                 {/* Badge giảm giá */}
               {/* Kiểm tra: Có giá cũ VÀ giá cũ > (giá mới hoặc 0) */}
                {product.oldPrice &&
                  product.oldPrice > (product.newPrice ?? 0) && (
                    <span className="absolute top-3 left-3 px-3 py-[3px] bg-[#e34646] text-white rounded-md text-sm font-semibold shadow">
                      -
                      {Math.round(
                        // Dùng (product.newPrice ?? 0) để tránh trừ cho undefined ra NaN
                        ((product.oldPrice - (product.newPrice ?? 0)) /
                          product.oldPrice) *
                          100
                      )}
                      %
                    </span>
                  )}
              <div className="px-4 pb-4 pt-2">
                <h2 className="text-base font-medium h-[42px] line-clamp-2">
                  {product.title}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-lg font-semibold text-[#e34646]">
                    ${product.newPrice}
                  </p>
                  <p className="text-sm font-medium text-black/60 line-through italic">
                    ${product.oldPrice}
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={16}
                      color={i < product.countStar! ? "#ffad33" : "#d1d1d1"}
                    />
                  ))}
                  <span className="ml-3 text-sm text-black/60 font-medium">
                    ({product.totalBuy})
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
