"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useDebounce from "#/hooks/useDebounce";
import { Product, useGetAllProductQuery } from "#/redux/features/productApi";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";
const Search = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { data: products = [] } = useGetAllProductQuery();
  const [keyword, setKeyword] = useState("");

  const debounceQuery = useDebounce(keyword, 700);
  // Tìm kiếm sản phẩm local
  useEffect(() => {
    if (debounceQuery.trim() === "") return setFilteredProducts([]);
    const results = products.filter((product) =>
      product?.title?.toLowerCase().includes(debounceQuery.trim().toLowerCase())
    );
    setFilteredProducts(results);
  }, [debounceQuery, products]);

  const handleDeleteInput = () => setKeyword("");

  return (
    <div>
      <div className="relative bg-[#f5f5f5] hidden rounded-lg lg:flex items-center px-2 py-1 group transition-all duration-200">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Bạn cần tìm gì?"
          className="w-[240px] h-[38px] px-2 outline-none bg-[#f5f5f5]"
        />
        {keyword.length > 0 ? (
          <button
            onClick={handleDeleteInput}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 cursor-pointer"
          >
            <TiDelete size={26} />
          </button>
        ) : (
          <div className="w-10 h-10 flex items-center justify-center ">
            <FaSearch className="mx-auto text-primary" size={20} />
          </div>
        )}
        {keyword && (
          <div className="absolute top-14 left-0 w-full max-h-[350px] overflow-y-auto bg-gray-100 rounded-md shadow-lg z-50 p-2 transition-all duration-300">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-sm text-primary font-semibold mb-2">
                  Kết quả tìm kiếm
                </p>
                <ul className="mb-2">
                  {filteredProducts.map((product) => (
                    <li key={product._id}>
                      <Link
                        href={`/products/${product._id}`}
                        className="py-2 pl-2 text-black/75 rounded-md hover:bg-black/10 block"
                      >
                        {product.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-center py-2 text-sm text-gray-500">
                Không tìm thấy sản phẩm phù hợp
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
