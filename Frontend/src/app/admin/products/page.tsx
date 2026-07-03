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
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { FaCaretLeft, FaCaretRight, FaRegEdit, FaRegEye } from "react-icons/fa";
import SearchInput from "#/components/Common/SearchInput";
import ReactPaginate from "react-paginate";

export default function Page() {
  const router = useRouter();
  const [deleteProduct] = useDeletedProductMutation();
  const { data: products = [], error, isLoading } = useGetAllProductQuery(undefined);
  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;
  const [keyword, setKeyword] = useState("");
  const debounceQuery = useDebounce(keyword, 700);

  useEffect(() => {
    setCurrentPage(0);
  }, [debounceQuery]);

  const filteredProducts = useMemo(() => {
    const query = debounceQuery.trim().toLowerCase();
    if (query === "") return products;
    return products.filter((product) =>
      product?.title?.toLowerCase().includes(query)
    );
  }, [debounceQuery, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return filteredProducts.slice(offset, offset + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

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

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  
  if (error)
    return (
      <div className="text-center py-10 text-red-500">Lỗi tải dữ liệu</div>
    );

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div>
          
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="w-full sm:w-64">
            <SearchInput
              value={keyword}
              onChange={setKeyword}
              placeholder="Tìm tên sản phẩm..."
            />
          </div>
          <Link 
            href="/admin/products/create" 
            className="cst_btn-secondary-icon"
          >
            <IoMdAdd size={20} />
            <span>Thêm mới</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4 text-center">Tồn kho</th>
              <th className="px-6 py-4">Tên sản phẩm</th>
              <th className="px-6 py-4">Giá</th>
              <th className="px-6 py-4">Phân loại</th>
              <th className="px-6 py-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-center">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold text-xs">
                      {product?.quantity > 1000 ? "999+" : product?.quantity || 0}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900 max-w-[250px] truncate" title={product.title}>
                    {product.title}
                  </td>
                  <td className="px-6 py-3 text-green-600 font-semibold">
                    ${product.price}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/products/${product._id}`}
                        className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200 transition-colors"
                        title="Xem chi tiết"
                      >
                        <FaRegEye size={18} />
                      </Link>
                      <Link
                        href={`/admin/products/edit/${product._id}`}
                        className="bg-yellow-100 text-yellow-600 p-2 rounded-lg hover:bg-yellow-200 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <FaRegEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product?._id)}
                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                        title="Xóa"
                      >
                        <MdDeleteOutline size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-end">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FaCaretRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={totalPages}
            previousLabel={<FaCaretLeft />}
            renderOnZeroPageCount={null}
            forcePage={currentPage}
            containerClassName="flex items-center gap-1 sm:gap-2"
            pageLinkClassName="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            previousLinkClassName="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
            nextLinkClassName="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
            activeLinkClassName="!bg-primary !text-white !border-primary"
            disabledLinkClassName="opacity-50 cursor-not-allowed hover:bg-transparent"
            breakLinkClassName="px-2 py-1 text-gray-500"
          />
        </div>
      )}
    </div>
  );
}