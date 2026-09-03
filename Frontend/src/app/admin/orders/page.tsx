"use client";

import SearchInput from "#/components/Common/SearchInput";
import useDebounce from "#/hooks/useDebounce";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "#/redux/features/ordersApi";
import Link from "next/dist/client/link";
import { useMemo, useState, useEffect } from "react";
import { FaCaretLeft, FaCaretRight, FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline, MdClose } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import type { AdminOrderItem, AdminOrder } from "#/types";

export default function OrdersPage() {
  const { data: orders = [], error, isLoading } = useGetAllOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [keyword, setKeyword] = useState("");
  const debounceQuery = useDebounce(keyword, 700);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setCurrentPage(0);
  }, [debounceQuery]);

  const filteredOrders = useMemo(() => {
    const query = debounceQuery.trim().toLowerCase();
    if (query === "") return orders;
    return orders.filter((order: Order) =>
      order?.username?.toLowerCase().includes(query),
    );
  }, [debounceQuery, orders]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginatedOrders = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return filteredOrders.slice(offset, offset + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const handleDeleteOrder = async (id: string) => {
    if (!confirm("Bạn có muốn xoá đơn hàng?")) return;
    try {
      await deleteOrder(id).unwrap();
      toast.success("Đã xoá đơn hàng");
    } catch (error) {
      toast.error("Lỗi khi xoá đơn hàng");
    }
  };

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;

  if (error)
    return (
      <div className="text-center py-10 text-red-500">Lỗi tải dữ liệu</div>
    );

  return (
    <div className="w-full relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Đơn hàng gần đây</h2>
        <div className="w-full md:w-1/3">
          <SearchInput
            value={keyword}
            onChange={setKeyword}
            placeholder="Tìm theo tên khách hàng..."
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Thông tin liên hệ</th>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4">Tổng tiền</th>
              <th className="px-6 py-4">Ngày đặt hàng</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-center">Tác động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order: Order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-3">
                    <p>
                      SĐT:{" "}
                      <span className="font-medium text-gray-900">
                        {order.phone}
                      </span>
                    </p>
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {order.username}
                  </td>
                  <td className="px-6 py-3 text-green-600 font-semibold">
                    ${order.totalPrice}
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                      : "N/A"}
                  </td>
                  <td className="px-6 py-3">
                    {order.status === "Đang xử lý" ? (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        {order.status}
                      </span>
                    ) : order.status === "Hoàn thành" ? (
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                        {order.status}
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200 transition-colors"
                        title="Xem chi tiết"
                      >
                        <FaRegEye size={18} />
                      </button>
                      <Link
                          href={`/admin/orders/edit/${order._id}`}
                          className="bg-yellow-100 text-yellow-600 p-2 rounded-lg hover:bg-yellow-200 transition-colors"
                          title="Chỉnh sửa"
                      >
                      <FaRegEdit size={18} />
                      </Link>
                      <button
                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                        title="Xóa"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        <MdDeleteOutline size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Không tìm thấy đơn hàng nào.
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

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                Chi tiết đơn hàng{" "}
                <span className="text-primary font-mono text-sm ml-2">
                  #{selectedOrder._id.slice(-6).toUpperCase()}
                </span>
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Thông tin khách hàng
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Họ tên:</span>
                      <span>{selectedOrder.username}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Số điện thoại:</span>
                      <span>{selectedOrder.phone}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Email:</span>
                      <span>{selectedOrder.email}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Thông tin giao dịch
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Ngày đặt:</span>
                      <span>
                        {selectedOrder.createdAt
                          ? new Date(
                              selectedOrder.createdAt,
                            ).toLocaleDateString("vi-VN")
                          : "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Trạng thái:</span>
                      {selectedOrder.status === "Đang xử lý" ? (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          {selectedOrder.status}
                        </span>
                      ) : selectedOrder.status === "Hoàn thành" ? (
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                          {selectedOrder.status}
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                          {selectedOrder.status}
                        </span>
                      )}
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Tổng tiền:</span>
                      <span className="text-green-600 font-bold text-base">
                        ${selectedOrder.totalPrice}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Sản phẩm đã đặt
                </h4>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                  {selectedOrder.productPay &&
                  selectedOrder.productPay.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedOrder.productPay.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className="flex justify-between items-center text-sm border-b border-gray-200 pb-2 last:border-0 last:pb-0"
                          >
                            <p>
                              <span className="text-gray-700 font-medium line-clamp-1 pr-4">
                                Mã Sản phẩm: {item.product}
                              </span>
                              <span className="text-gray-700 font-medium line-clamp-1 pr-4">
                                Tên sản phẩm: {item?.name}
                              </span>
                            </p>
                            <span className="text-gray-900 font-semibold whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm">
                              x {item.quantity}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Không có thông tin chi tiết sản phẩm.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Địa chỉ giao hàng
                </h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {selectedOrder.address}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="cst_btn"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
