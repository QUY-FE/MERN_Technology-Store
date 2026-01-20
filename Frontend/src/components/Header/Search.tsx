"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa"; // Thêm icon Spinner
import useDebounce from "#/hooks/useDebounce";
import { Product, useGetAllProductQuery } from "#/redux/features/productApi";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";

const Search = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // Lấy thêm isLoading để hiển thị trạng thái
  const { data: products = [], isLoading } = useGetAllProductQuery();
  const [keyword, setKeyword] = useState("");
  
  // Ref để xử lý click outside
  const searchRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const debounceQuery = useDebounce(keyword, 700);

  // FIX: Thêm dependencies vào useEffect
  useEffect(() => {
    if (!debounceQuery.trim()) {
      setFilteredProducts([]);
      return;
    }

    // Chỉ lọc khi có dữ liệu sản phẩm
    if (products.length > 0) {
      const results = products.filter((product) =>
        product?.title?.toLowerCase().includes(debounceQuery.trim().toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [debounceQuery, products]); // Dependencies quan trọng

  // Xử lý hiển thị dropdown
  useEffect(() => {
    if (debounceQuery && filteredProducts.length >= 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [debounceQuery, filteredProducts]);

  // Xử lý click outside để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteInput = () => {
    setKeyword("");
    setFilteredProducts([]);
    setShowDropdown(false);
  };

  const handleProductClick = () => {
    setShowDropdown(false);
    setKeyword(""); // Tuỳ chọn: có muốn xóa text sau khi click ko
  };

  return (
    // Thêm ref vào div bao ngoài cùng
    <div ref={searchRef}>
      <div className="relative bg-[#f5f5f5] hidden rounded-lg lg:flex items-center px-2 py-1 group transition-all duration-200">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            if (e.target.value.length > 0) setShowDropdown(true);
          }}
          onFocus={() => {
            if (keyword) setShowDropdown(true);
          }}
          placeholder="Bạn cần tìm gì ?"
          className="w-[300px] h-[38px] px-2 outline-none bg-[#f5f5f5] text-black"
        />
        
        {/* Logic hiển thị icon: Loading -> Delete -> Search */}
        {isLoading ? (
          <div className="w-10 h-10 flex items-center justify-center animate-spin text-gray-500">
             <FaSpinner size={18} />
          </div>
        ) : keyword.length > 0 ? (
          <button
            onClick={handleDeleteInput}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 cursor-pointer text-gray-600"
          >
            <TiDelete size={26} />
          </button>
        ) : (
          <div className="w-10 h-10 flex items-center justify-center ">
            <FaSearch className="mx-auto text-primary" size={20} />
          </div>
        )}

        {/* Dropdown kết quả */}
        {showDropdown && keyword && (
          <div className="absolute top-14 left-0 w-full max-h-[350px] overflow-y-auto bg-white rounded-md shadow-xl border border-gray-200 z-50 p-2 transition-all duration-300 scrollbar-thin scrollbar-thumb-gray-300">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-xs text-gray-500 font-semibold mb-2 px-2 uppercase">
                  Kết quả tìm kiếm
                </p>
                <ul className="flex flex-col gap-1">
                  {filteredProducts.map((product) => (
                    <li key={product._id}>
                      <Link
                        href={`/products/${product._id}`}
                        onClick={handleProductClick}
                        className="flex items-center gap-3 py-2 px-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        {/* Nếu có ảnh sản phẩm thì hiển thị ở đây sẽ đẹp hơn */}
                        {/* <img src={product.thumbnail} className="w-8 h-8 object-cover rounded" /> */}
                        <span className="line-clamp-1">{product.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">
                  Không tìm thấy sản phẩm {keyword}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;