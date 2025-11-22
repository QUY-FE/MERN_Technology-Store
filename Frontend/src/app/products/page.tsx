"use client";
import { useState } from "react";
import Link from "next/link";
import { FaStar, FaAngleLeft, FaAngleRight } from "react-icons/fa";

import Categories from "#/components/Categories";
import Image from "next/image";
import { useGetAllProductQuery } from "#/redux/features/productApi";
const ITEMS_PER_PAGE = 15;

export default function Page() {
  const { data: products = []} = useGetAllProductQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  
  // State for the selected category
  const [selectedCategory, setSelectedCategory] = useState("ALL"); // TS infers this as 'string'

  // Filter products based on selectedCategory
  
  const filteredProducts =
    selectedCategory.toLowerCase() === "all"
      ? products // Nếu category là "all" thì trả về toàn bộ products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() === selectedCategory.toLowerCase()
        ); // TS infers this as 'Product[]'

  // Calculate pagination based on filtered list
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ); // TS infers this as 'Product[]'

  // Handle category change from child component
  // Add 'string' type to the parameter
  const handleCategoryChange = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setCurrentPage(1); // Reset về trang 1 khi đổi category
  };

  return (
    <section className="max-w-[1200px] mx-auto pb-10">
      {/* Pass state and handler down to Categories */}
      <Categories
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="my-8 border-t border-gray-200"></div>

      {/* === THAY ĐỔI BẮT ĐẦU TỪ ĐÂY === */}

      {/* Kiểm tra xem filteredProducts có phần tử nào không */}
      {filteredProducts.length > 0 ? (
        // Nếu CÓ, hiển thị lưới sản phẩm
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-6 px-2">
          {paginatedProducts.map((product) => (
            <article key={product?._id} className="relative w-full  rounded-xl shadow-lg bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group">
              {/* Link hover overlay */}
              <Link
                href={`/products/${product._id}`}
                className="absolute inset-0 z-20"
              ></Link>

              {/* Ảnh sản phẩm */}
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

                  
              {/* Nội dung */}
              <div className="px-4 pb-4 pt-2">
                <h2 className="text-base font-medium h-[42px] line-clamp-2">
                  {product.title}
                </h2>

                {/* Giá */}
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-lg font-semibold text-[#e34646]">
                    ${product.newPrice}
                  </p>
                  <p className="text-sm font-medium text-black/60 line-through italic">
                    ${product.oldPrice}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={16}
                      color={i < (product.countStar ?? 0) ? "#ffad33" : "#d1d1d1"}
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
      ) : (
        // Nếu KHÔNG, hiển thị thông báo
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-xl text-gray-500">Không tìm thấy sản phẩm nào.</p>
        </div>
      )}
      {/* === KẾT THÚC THAY ĐỔI LƯỚI SẢN PHẨM === */}

      {/* === THAY ĐỔI PHÂN TRANG === */}
      {/* Chỉ hiển thị phân trang nếu totalPages > 0 */}
      {totalPages > 0 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            className={`px-3 py-2 rounded-md border bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaAngleLeft size={22} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-md border transition-colors ${
                currentPage === page
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            className={`px-3 py-2 rounded-md border bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <FaAngleRight size={22} />
          </button>
        </div>
      )}
      {/* === KẾT THÚC THAY ĐỔI PHÂN TRANG === */}
    </section>
  );
}
