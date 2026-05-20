"use client";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "#/hooks/useDebounce";
import Link from "next/link";
import {
  useDeletedProductMutation,
  useGetAllProductQuery,
} from "#/redux/features/productApi";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// icon
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { FaCaretLeft, FaCaretRight, FaRegEdit, FaRegEye } from "react-icons/fa";
import SearchInput from "#/components/SearchInput";

export default function Page() {
  const router = useRouter();
  const [deleteProduct] = useDeletedProductMutation();

  const { data: products = [],error, isLoading} = useGetAllProductQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [keyword, setKeyword] = useState("");
  const debounceQuery = useDebounce(keyword, 700);
  
  

  // Lọc sản phẩm trước, sau đó phân trang
  const filteredProducts = useMemo(() => {
    const query = debounceQuery.trim().toLowerCase();
    if (query === "") return products;
    return products.filter((product) =>
      product?.title?.toLowerCase().includes(query),
    );
  }, [debounceQuery, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Bạn có muốn xoá sản phẩm?")) return;
    try {
      await deleteProduct(id).unwrap();
      toast.success("Đã xoá sản phẩm");
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Không thể xoá sản phẩm");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debounceQuery]);


  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">Lỗi tải dữ liệu</div>
    );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl">
          <strong>Tất cả sản phẩm</strong>
        </h1>
        <p>Tổng quan về sản phẩm trên hệ thống.</p>
      </div>
      {/* Pagination controls  */}
      <div className="flex items-center justify-end gap-4 mb-4">
        <div className="flex justify-center  my-4 gap-2 border border-colorBorder rounded-md">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2  hover:bg-gray-200 disabled:opacity-50"
          >
            <FaCaretLeft />
          </button>
          <span className="px-3 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 hover:bg-gray-200   disabled:opacity-50"
          >
            <FaCaretRight />
          </button>
        </div>
        <Link href="/admin/products/create" className="cst_btn-primary">
          <IoMdAdd />
          Thêm mới
        </Link>
      </div>
      {/* Pagination controls */}

      {/* search controls */}
      <SearchInput
        value={keyword}
        onChange={setKeyword}
        placeholder="Tìm sản phẩm ?"
      />
      {/* search controls */}

      {/* Product table */}
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Tồn kho</th>
            <th className="px-4 py-2">Tên sản phẩm</th>
            <th className="px-4 py-2">Giá</th>
            <th className="px-4 py-2">Phân loại</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-2 text-center ">
                  <span className="px-2 py-1 bg-green-100 rounded-2xl font-semibold text-green-800">
                    {product?.quantity > 1000
                      ? "999+"
                      : product?.quantity || "N/A"}
                  </span>
                </td>
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2">${product.newPrice}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={`/admin/products/${product._id}`}
                      className="bg-green-100 rounded-lg text-green-600 px-3 py-2 flex items-center gap-2 hover:scale-110 transition-transform duration-300"
                    >
                      <FaRegEye size={22} />
                    </Link>
                    <Link
                      href={`/admin/products/edit/${product._id}`}
                      className="bg-yellow-100 rounded-lg text-yellow-600 px-3 py-2 flex items-center gap-2  hover:scale-110 transition-transform duration-300"
                    >
                      <FaRegEdit size={22} />
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product?._id)}
                      className="bg-red-100 rounded-lg text-red-600 px-3 py-2 flex items-center gap-2 hover:scale-110 transition-transform duration-300"
                    >
                      <MdDeleteOutline size={22} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-2">
                Không có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
