"use client";
import { useState } from "react";
import Link from "next/link";
import { FaStar, FaAngleLeft, FaAngleRight } from "react-icons/fa";

import Categories from "#/components/Categories";
import { useProducts } from "#/context/productContext";
const ITEMS_PER_PAGE = 8;

export default function Page() {

  const { products } = useProducts();
  
  const [currentPage, setCurrentPage] = useState(1);

  // State for the selected category
  const [selectedCategory, setSelectedCategory] = useState("ALL"); // TS infers this as 'string'

  // Filter products based on selectedCategory
  const filteredProducts = selectedCategory.toLowerCase() === "all" 
  ? products  // Nếu category là "all" thì trả về toàn bộ products
  : products.filter(
      (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
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
        <div className="h-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {paginatedProducts.map((product, index) => (
           <article
                className="relative group block w-[270px] h-[330px] shadow-lg hover:-top-1 transition-all duration-300 ease-in-out"
                key={`product__${index}`}
              >
                <Link
                  href={`/products/${product?.slug}`}
                  className="absolute inset-0 hidden  group-hover:flex justify-between py-3 px-2 z-50 hover:bg-black/5"
                ></Link>
                <img
                  src={product?.image || "/keyboard.jpg"}
                  alt={product?.title}
                  className="w-full h-[200px] relative object-cover rounded-t-lg shadow-md"
                />
                <span className="absolute top-4 left-3 w-[55px] h-[27px] bg-[#e34646] text-white rounded text-md text-center font-semibold">
                  -{product?.salePercent}%
                </span>
                <div className="px-4 py-2">
                  <h1 className="w-full h-[40px] font-medium leading-[40px]">
                    {product?.title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <p className="h-[30px] text-[#e34646] text-lg font-medium leading-[30px]">
                      ${product?.newPrice}
                    </p>
                    <p className="h-[30px] leading-[30px] font-medium text-sm italic line-through text-black/60">
                      ${product?.oldPrice}
                    </p>
                  </div>
                  <div className="flex items-center h-[30px] leading-[30px]">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < product.countStar ? "#ffad33" : "gray"}
                      />
                    ))}
                    <p className="px-4 text-black/70 font-medium">
                      ({product?.totalBuy})
                    </p>
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