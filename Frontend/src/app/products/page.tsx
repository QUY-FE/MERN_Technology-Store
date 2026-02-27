"use client";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import Categories from "#/app/products/components/Categories";
import { useGetAllProductQuery } from "#/redux/features/productApi";
import ProductCard from "#/components/ProductCard";
import ProductsLoading from "./ProductsLoading";
import Link from "next/link";

const ITEMS_PER_PAGE = 15;

export default function Page() {
  const { data: products = [] ,isLoading, isError } = useGetAllProductQuery(undefined);
  
  // Ref để scroll tới vị trí danh sách sản phẩm
  // const listTopRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  
  // State mới cho việc sắp xếp
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "best_selling" >("latest");
  const [priceSort, setPriceSort] = useState<"default" | "asc" | "desc">("default");

  // --- XỬ LÝ LOGIC ---

  // 1. Lọc theo Category
  const processedProducts =
    selectedCategory.toLowerCase() === "all"
      ? [...products] // Tạo bản sao mảng để sort không ảnh hưởng data gốc
      : products.filter(
          (product) =>
            product.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  // 2. Sắp xếp theo Tab (Mới nhất, Phổ biến, Bán chạy)
  // Lưu ý: Bạn cần thay thế 'createdAt', 'views', 'sold' bằng tên trường thực tế trong MongoDB của bạn
  if (sortBy === "latest") {
    processedProducts.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  } else if (sortBy === "popular") {
    processedProducts.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (sortBy === "best_selling") {
    processedProducts.sort((a, b) => (b.sold || 0) - (a.sold || 0));
  }

  // 3. Sắp xếp theo Giá (Ghi đè hoặc chạy sau logic trên)
  if (priceSort === "asc") {
    processedProducts.sort((a, b) => a.newPrice - b.newPrice);
  } else if (priceSort === "desc") {
    processedProducts.sort((a, b) => b.newPrice - a.newPrice);
  }

  // 4. Phân trang
  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = processedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // --- HANDLERS ---

  const handleCategoryChange = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setCurrentPage(1);
    setSortBy("latest"); // Reset sort khi đổi danh mục (tuỳ chọn)
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // --- EFFECT: LÀM MỊN CHUYỂN TRANG ---
  // Mỗi khi currentPage thay đổi, scroll nhẹ lên đầu danh sách
  // useEffect(() => {
  //   if (listTopRef.current) {
  //     // Offset -100px để không bị sát mép header quá
  //     const topPos = listTopRef.current.getBoundingClientRect().top + window.scrollY - 30;
  //     window.scrollTo({ top: topPos, behavior: "smooth" });
  //   }
  // }, [currentPage]);

  if(isLoading) return <ProductsLoading />;
  if(isError) return <h1>Đã có lỗi xảy ra. <Link href="/">Quay lại trang chủ</Link></h1>;
 
  return (
    <section className="max-w-[1200px] mx-auto pb-10">
      <Categories
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="my-8 border-t border-gray-200"></div>

      {/* === UI THANH CÔNG CỤ (SORT & FILTER) === */}
      <div 
        // ref={listTopRef} // Gắn ref vào đây để scroll tới khi chuyển trang
        className="bg-gray-50 py-3 px-4 rounded mb-6 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        {/* Nhóm nút Sắp xếp */}
        <div className="flex items-center gap-2 text-sm overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <span className="text-gray-500 mr-2 whitespace-nowrap">Sắp xếp theo</span>
          
           {/* Nút Mới nhất */}
          <button
            onClick={() => setSortBy("latest")}
            className={`px-4 py-2 rounded shadow-sm transition-all whitespace-nowrap ${
              sortBy === "latest" ? "bg-red-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Mới nhất
          </button>

          {/* Nút Phổ biến */}
          <button
            onClick={() => setSortBy("popular")}
            className={`px-4 py-2 rounded shadow-sm transition-all whitespace-nowrap ${
              sortBy === "popular" ? "bg-red-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Phổ biến
          </button>

         

          {/* Nút Bán chạy */}
          <button
            onClick={() => setSortBy("best_selling")}
            className={`px-4 py-2 rounded shadow-sm transition-all whitespace-nowrap ${
              sortBy === "best_selling" ? "bg-red-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Bán chạy
          </button>
        </div>

        {/* Nhóm Lọc giá & Mini Pagination */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Select Giá */}
          <div className="relative">
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as string as "default" | "asc" | "desc")}
              className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
            >
              <option value="default">Giá: Mặc định</option>
              <option value="asc">Giá: Thấp đến Cao</option>
              <option value="desc">Giá: Cao đến Thấp</option>
            </select>
            {/* Custom Arrow Icon cho Select */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Mini Pagination (Trái/Phải) */}
          <div className="flex items-center bg-white rounded border border-gray-300 overflow-hidden">
             <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
             >
                <FaAngleLeft />
             </button>
             <div className="px-3 text-sm font-medium">
                {currentPage}/{totalPages > 0 ? totalPages : 1}
             </div>
             <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
             >
                <FaAngleRight />
             </button>
          </div>
        </div>
      </div>

      {/* === DANH SÁCH SẢN PHẨM === */}
      {processedProducts.length > 0 ? (
        // Thêm animation fade-in nhẹ khi render
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-6 px-2 animate-fade-in">
          {paginatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-xl text-gray-500">Không tìm thấy sản phẩm nào.</p>
        </div>
      )}

      {/* === PHÂN TRANG CHÍNH (GIỮ NGUYÊN HOẶC CẬP NHẬT LOGIC SCROLL) === */}
      {totalPages > 0 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            className={`px-3 py-2 rounded-md border bg-white hover:bg-gray-100 transition-colors disabled:opacity-50`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaAngleLeft size={22} />
          </button>
          
          {/* Logic hiển thị số trang có thể rút gọn nếu quá nhiều trang, ở đây giữ nguyên logic cơ bản */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
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
            className={`px-3 py-2 rounded-md border bg-white hover:bg-gray-100 transition-colors disabled:opacity-50`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaAngleRight size={22} />
          </button>
        </div>
      )}
    </section>
  );
}