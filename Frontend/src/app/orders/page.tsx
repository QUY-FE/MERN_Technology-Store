"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "#/context/authContext";
import { useGetAllOrdersQuery } from "#/redux/features/ordersApi";
import { BsArrowLeft } from "react-icons/bs";

export default function OrderHistoryPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="animate-pulse text-gray-600">Đang tải đơn hàng...</p>
      </div>
    );
  }

  if (!user) return null;

  // const userOrders =
  // (orders
  //   ?.filter((o) => o.email === user.email)
  //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))) || [];

  return (
    <section className="min-h-screen w-full py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Lịch sử đơn hàng
        </h1>

        {orders.length === 0 && (
          <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">
                  Mã đơn: {order._id}
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt!).toLocaleDateString("vi-VN")}
                </span>
              </div>

              <div className="mt-3 text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Tên:</span> {order.username}
                </p>
                <p>
                  <span className="font-medium">Địa chỉ:</span> {order.address}
                </p>
                <p>
                  <span className="font-medium">Số điện thoại:</span>{" "}
                  {order.phone}
                </p>
                <p>
                  <span className="font-medium">Thanh toán:</span>{" "}
                  {order.payment}
                </p>
                <p>
                  <span className="font-medium">Tổng tiền:</span>{" "}
                  {order.totalPrice}₫
                </p>
              </div>

              <div className="mt-4">
                <p className="font-medium text-gray-800 mb-1">Sản phẩm:</p>
                <ul className="list-disc ml-6 text-gray-600 text-sm">
                  {order.productIds!.map((id) => (
                    <li key={id}>{id}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 text-sm font-bold text-gray-500 hover:text-primary transition flex items-center justify-center gap-2"
        >
            <BsArrowLeft size={20} />
          Quay về trang chủ
        </button>
      </div>
    </section>
  );
}
