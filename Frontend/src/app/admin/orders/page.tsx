"use client";

import SearchInput from "#/components/SearchInput";
import useDebounce from "#/hooks/useDebounce";
import { useGetAllOrdersQuery } from "#/redux/features/ordersApi";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaCaretLeft, FaCaretRight, FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export default function OrdersPage() {
  const { data: orders = [], error, isLoading } = useGetAllOrdersQuery();
  const [keyword, setKeyword] = useState("");
  const debounceQuery = useDebounce(keyword, 700);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  console.log(orders);
  // Lọc sản phẩm trước, sau đó phân trang
  const filteredOrders = useMemo(() => {
    const query = debounceQuery.trim().toLowerCase();
    if (query === "") return orders;
    return orders.filter((order) =>
      order?.username?.toLowerCase().includes(query),
    );
  }, [debounceQuery, orders]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">Lỗi tải dữ liệu</div>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Đơn hàng gần đây</h2>
      {/* search controls */}
      <SearchInput
        value={keyword}
        onChange={setKeyword}
        placeholder="Tìm sản phẩm ?"
      />
      {/* Pagination controls and add button */}
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
      </div>
      {/* Pagination controls */}
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Thông tin liên hệ</th>
            <th className="px-4 py-2">Khách hàng</th>
            <th className="px-4 py-2">Tổng tiền</th>
            <th className="px-4 py-2">Ngày đặt hàng</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Tác động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <tr key={order._id} className="border-t text-gray-600">
                <td className="px-4 py-2 text-left">
                  <p>
                    Email:{" "}
                    <span className="font-light italic">{order.email}</span>
                  </p>
                  <p>
                    Số điện thoại:{" "}
                    <span className="font-light italic">{order.phone}</span>
                  </p>
                  <p>
                    Địa chỉ:{" "}
                    <span className="font-light italic">{order.address}</span>
                  </p>
                </td>
                <td className="px-4 py-1">{order.username}</td>
                <td className="px-4 py-1">${order.totalPrice}</td>
                <td className="px-4 py-1">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                    : "N/A"}
                </td>
                <td className="px-4 py-1">no connect</td>
                <td className="px-4 py-1">
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={""}
                      className="bg-green-100 rounded-lg text-green-600 px-3 py-2 flex items-center gap-2 hover:scale-110 transition-transform duration-300"
                    >
                      <FaRegEye size={22} />
                    </Link>
                    <Link
                      href={""}
                      className="bg-yellow-100 rounded-lg text-yellow-600 px-3 py-2 flex items-center gap-2  hover:scale-110 transition-transform duration-300"
                    >
                      <FaRegEdit size={22} />
                    </Link>
                    <button className="bg-red-100 rounded-lg text-red-600 px-3 py-2 flex items-center gap-2 hover:scale-110 transition-transform duration-300">
                      <MdDeleteOutline size={22} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-4 text-gray-500">
                Không có đơn hàng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
