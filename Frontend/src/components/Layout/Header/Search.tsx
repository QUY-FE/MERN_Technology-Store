"use client";
import { useEffect, useState, useRef } from "react";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";
import useDebounce from "#/hooks/useDebounce";
import { useGetAllProductQuery } from "#/redux/features/productApi";
import type { Product } from "#/types";
import { BiSearchAlt } from "react-icons/bi";

const EMPTY_PRODUCTS: Product[] = [];


const Search = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { data: products = EMPTY_PRODUCTS, isLoading } = useGetAllProductQuery();
  const [keyword, setKeyword] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
        setIsSearchOpen(false);
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
    setIsSearchOpen(false);
  };

  const renderSearchResults = () => {
    if (!showDropdown || !keyword) return null;

    return (
      <div className="mt-2 max-h-[350px] w-full overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 shadow-lg transition-all duration-200 scrollbar-thin scrollbar-thumb-gray-300">
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
              Không tìm thấy sản phẩm &quot;{keyword}&quot;
            </p>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div ref={searchRef} className="relative">
      <button
        type="button"
        onClick={() => {
          setIsSearchOpen((current) => !current);
          if (isSearchOpen) setShowDropdown(false);
        }}
        aria-label={isSearchOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm"}
        aria-expanded={isSearchOpen}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-900 transition-colors hover:bg-gray-100"
      >
        {isSearchOpen ? (
          <TiDelete size={26} className="text-gray-600" />
        ) : (
          <BiSearchAlt size={22} />
        )}
      </button>

      {isSearchOpen && (
        <div className="absolute right-[-44px] top-[calc(100%+14px)] z-50 w-[min(88vw,380px)] origin-top-right rounded-xl border border-gray-200 bg-white p-3 shadow-2xl sm:right-0">
          <div className="relative flex items-center rounded-lg bg-gray-100 px-2 ring-gray-900/10 focus-within:ring-2">
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
              className="h-10 w-full bg-transparent pl-2 text-sm text-gray-950 outline-none"
            />
            {keyword.length > 0 ? (
              <button
                type="button"
                onClick={handleDeleteInput}
                aria-label="Xóa từ khóa tìm kiếm"
                className="flex h-9 w-9 items-center justify-center text-gray-500 hover:text-black"
              >
                <TiDelete size={24} />
              </button>
            ) : (
              <div className="flex h-9 w-9 items-center justify-center text-gray-500">
                <BiSearchAlt size={20} />
              </div>
            )}
          </div>

          {renderSearchResults()}
        </div>
      )}
    </div>
  );
};

export default Search;
