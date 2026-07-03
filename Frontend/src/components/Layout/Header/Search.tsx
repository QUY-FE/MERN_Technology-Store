"use client";
import { useEffect, useState, useRef } from "react";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";
import useDebounce from "#/hooks/useDebounce";
import { Product, useGetAllProductQuery } from "#/redux/features/productApi";
import { BiSearchAlt } from "react-icons/bi";

const EMPTY_PRODUCTS: Product[] = [];


const Search = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { data: products = EMPTY_PRODUCTS, isLoading } = useGetAllProductQuery();
  const [keyword, setKeyword] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const debounceQuery = useDebounce(keyword, 800);

  // Gộp chung logic tìm kiếm và hiển thị dropdown để tránh loop
  useEffect(() => {
    const trimmedQuery = debounceQuery.trim();

    if (!trimmedQuery) {
      setFilteredProducts([]);
      setShowDropdown(false);
      return;
    }

    if (products.length > 0) {
      const results = products.filter((product) =>
        product?.title
          ?.toLowerCase()
          .includes(trimmedQuery.toLowerCase()),
      );
      setFilteredProducts(results);
      setShowDropdown(true);
    } else {
      setFilteredProducts([]);
      setShowDropdown(true);
    }
  }, [debounceQuery, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setIsMobileSearchOpen(false);
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
    setKeyword("");
    setIsMobileSearchOpen(false);
  };

  const renderSearchResults = () => {
    if (!showDropdown || !keyword) return null;

    return (
      <div className="absolute top-[calc(100%+8px)] left-0 w-full max-h-[350px] overflow-y-auto bg-white rounded-md shadow-xl border border-gray-200 z-50 p-2 transition-all duration-300 scrollbar-thin scrollbar-thumb-gray-300">
        {isLoading ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">Đang tìm kiếm...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <p className="text-xs text-gray-500 font-semibold mb-2 px-2 uppercase">
              Có phải sản phẩm bạn tìm kiếm?
            </p>
            <ul className="flex flex-col gap-1">
              {filteredProducts.map((product) => (
                <li key={product._id}>
                  <Link
                    href={`/products/${product._id}`}
                    onClick={handleProductClick}
                    className="flex items-center gap-3 py-2 px-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <span className="line-clamp-1">{product.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : keyword ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">
              Không tìm thấy sản phẩm "{keyword}"
            </p>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div ref={searchRef} className="relative">
      {/* 1. GIAO DIỆN PC & TABLET */}
      <div className="hidden md:flex relative bg-[#f5f5f5] rounded-full items-center py-1 px-2 group transition-all duration-200">
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
          placeholder="Nhập sản phẩm cần tìm..."
          className="w-[300px] h-[32px] pl-6 outline-none bg-[#f5f5f5] text-black rounded-full"
        />

        {keyword.length > 0 ? (
          <button
            onClick={handleDeleteInput}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 cursor-pointer text-gray-500"
          >
            <TiDelete size={26} />
          </button>
        ) : (
          <div className="w-10 h-10 flex items-center justify-center">
            <BiSearchAlt className="mx-auto text-gray-500" size={20} />
          </div>
        )}

        {renderSearchResults()}
      </div>

      {/* 2. GIAO DIỆN MOBILE */}
      <button
        onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5"
      >
        {isMobileSearchOpen ? (
          <TiDelete size={28} className="text-gray-600" />
        ) : (
          <BiSearchAlt size={24} />
        )}
      </button>

      {isMobileSearchOpen && (
        <div className="absolute top-[150%] right-[-235%] w-[100vw] sm:w-[350px] bg-white shadow-2xl border border-gray-100 rounded-lg p-3 z-50 md:hidden origin-top-right transition-all">
          <div className="relative flex items-center bg-[#f5f5f5] rounded-full px-2">
            <input
              type="text"
              autoFocus
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                if (e.target.value.length > 0) setShowDropdown(true);
              }}
              onFocus={() => {
                if (keyword) setShowDropdown(true);
              }}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full h-[38px] pl-2 outline-none bg-transparent text-black text-sm"
            />
            {keyword.length > 0 ? (
              <button
                onClick={handleDeleteInput}
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black"
              >
                <TiDelete size={24} />
              </button>
            ) : (
              <div className="w-9 h-9 flex items-center justify-center ">
                <BiSearchAlt size={20} />
              </div>
            )}
          </div>

          <div className="relative w-full">{renderSearchResults()}</div>
        </div>
      )}
    </div>
  );
};

export default Search;