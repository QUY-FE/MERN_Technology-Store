"use client";
import { useDeletedProductMutation, useGetAllProductQuery } from "#/redux/features/productApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdOutlineFeaturedPlayList } from "react-icons/md";
import { TiSpanner } from "react-icons/ti";
import { toast } from "react-toastify";
import { useState } from "react";
import Image from "next/image";
export default function Page() {
  const router = useRouter();
  const [deleteProduct] = useDeletedProductMutation();
  const { data: products = [] } = useGetAllProductQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tất cả sản phẩm</h2>
      <div className="flex items-center justify-end mb-4">
        <Link
          href="/admin/products/create"
          className="cst_btn-primary px-6 py-2 flex items-center gap-2"
        >
          Thêm
          <IoMdAdd />
        </Link>
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center my-4 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Trang trước
        </button>
        <span className="px-3 py-1">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Tên</th>
            <th className="px-4 py-2">Giá</th>
            <th className="px-4 py-2">Tồn kho</th>
            <th className="px-4 py-2">Gallery</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="px-4 py-2">{product.title}</td>
              <td className="px-4 py-2">${product.newPrice}</td>
              <td className="px-4 py-2">{product.quantity || "N/A"}</td>
              <td className="px-4 py-2">
                {/* Hiển thị số lượng ảnh gallery và ảnh đầu tiên nếu có */}
                {Array.isArray(product.gallery) && product.gallery.length > 0 ? (
                  <div className="flex flex-col items-center gap-1">
                    <Image
                      src={`/${product.gallery[0]}`}
                      alt="gallery"
                      width={48}
                      height={48}
                      className="object-cover rounded border mb-1"
                    />
                    <span className="text-xs text-gray-500">{product.gallery.length} ảnh</span>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">Không có</span>
                )}
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center justify-center gap-3">
                  <Link
                    href={`/admin/products/${product._id}`}
                    className="cst_btn-primary px-4 py-2 flex items-center gap-2"
                  >
                    <MdOutlineFeaturedPlayList />
                    Xem
                  </Link>
                  <Link
                    href={`/admin/products/edit/${product._id}`}
                    className="cst_btn-primary px-4 py-2 flex items-center gap-2"
                  >
                    <TiSpanner />
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(product?._id)}
                    className="cst_btn-primary px-4 py-2 flex items-center gap-2"
                  >
                    Xoá
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}
