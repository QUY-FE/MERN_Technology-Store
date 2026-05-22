"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";


import Categories from "#/app/products/components/Categories";
import { useGetAllProductQuery } from "#/redux/features/productApi";
import ProductCard from "#/components/ProductCard";
import ProductsLoading from "./ProductsLoading";

const ITEMS_PER_PAGE = 15;

export default function Page() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetAllProductQuery(undefined);

  const listTopRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "best_selling">(
    "latest",
  );
  const [priceSort, setPriceSort] = useState<"default" | "asc" | "desc">(
    "default",
  );

  const processedProducts = useMemo(() => {
    const result =
      selectedCategory.toLowerCase() === "all"
        ? [...products]
        : products.filter(
            (product) =>
              product.category?.toLowerCase() ===
              selectedCategory.toLowerCase(),
          );

    return result;
  }, [products, selectedCategory]);

  // Phân trang
  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedProducts, currentPage]);

  const handleCategoryChange = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setCurrentPage(1);
    setSortBy("latest");
    setPriceSort("default");
  };

  const handlePaginateClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    if (listTopRef.current && currentPage > 1) {
      const topPos =
        listTopRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }
  }, [currentPage]);

  if (isLoading) return <ProductsLoading />;
  if (isError)
    return (
      <h1 className="text-center mt-10">
        Đã có lỗi xảy ra.{" "}
        <Link href="/" className="text-blue-500 underline">
          Quay lại trang chủ
        </Link>
      </h1>
    );

  return (
    <section className="max-w-[1200px] mx-auto pb-10">
      <Categories
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="my-8 border-t border-gray-200"></div>

      <div
        ref={listTopRef}
        className="bg-gray-100 py-3 px-4 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
      >
        {/* Nhóm nút Sắp xếp */}
        <div className="flex items-center gap-2 text-sm overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          <span className="text-gray-500 mr-2 whitespace-nowrap font-medium">
            Sắp xếp:
          </span>

          <button
            onClick={() => setSortBy("latest")}
            className={` ${
              sortBy === "latest" ? "cst_btn-primary" : "cst_btn-secondary"
            }`}
          >
            Mới nhất
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={` ${
              sortBy === "popular" ? "cst_btn-primary" : "cst_btn-secondary"
            }`}
          >
            Phổ biến
          </button>
          <button
            onClick={() => setSortBy("best_selling")}
            className={` ${
              sortBy === "best_selling"
                ? "cst_btn-primary"
                : "cst_btn-secondary"
            }`}
          >
            Bán chạy
          </button>
        </div>

        {/* Nhóm Lọc giá & Mini Pagination */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="relative">
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as any)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary text-sm font-medium cursor-pointer"
            >
              <option value="default">Giá: Mặc định</option>
              <option value="asc">Giá: Thấp đến Cao</option>
              <option value="desc">Giá: Cao đến Thấp</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <FaAngleLeft className="-rotate-90 text-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* === DANH SÁCH SẢN PHẨM === */}
      {processedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 px-2 animate-fade-in">
          {paginatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px] ">
          <p className="text-lg text-gray-500 font-medium">
            Không tìm thấy sản phẩm nào phù hợp.
          </p>
          <button
            onClick={() => handleCategoryChange("ALL")}
            className="cst_btn-primary"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={<FaAngleRight />}
          onPageChange={handlePaginateClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={totalPages}
          previousLabel={<FaAngleLeft />}
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
          containerClassName="flex items-center justify-center space-x-1 sm:space-x-2 mt-12"
          pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-medium transition-all"
          previousLinkClassName="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-all"
          nextLinkClassName="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-all"
          activeLinkClassName="!bg-red-500 !text-white !border-red-500 shadow-md"
          breakLinkClassName="w-10 h-10 flex items-center justify-center text-gray-500"
          disabledLinkClassName="opacity-40 cursor-not-allowed pointer-events-none"
        />
      )}
    </section>
  );
}
