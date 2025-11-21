"use client";

import { useGetAllOrdersQuery } from "#/redux/features/ordersApi";

export default function OrdersPage() {
  const { data: orders = [], error, isLoading } = useGetAllOrdersQuery();

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi tải dữ liệu</div>;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Đơn hàng gần đây</h2>
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Số đơn</th>
            <th className="px-4 py-2">Khách hàng</th>
            <th className="px-4 py-2">Tổng tiền</th>
            <th className="px-4 py-2">Ngày đặt</th>
          </tr>
        </thead>
        <tbody>
          {orders.slice(0, 10).map((order) => (
            <tr key={order._id} className="border-t">
              <td className="px-4 py-2">{order._id}</td>
              <td className="px-4 py-2">{order.username}</td>
              <td className="px-4 py-2">${order.totalPrice}</td>
              <td className="px-4 py-2">
                {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}