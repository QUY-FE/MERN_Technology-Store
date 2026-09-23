"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "#/context/authContext";
import { useAuthModal } from "#/context/authModalContext";
import { useGetOrderByEmailQuery } from "#/redux/features/ordersApi";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";

export default function OrderHistoryPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { openAuth } = useAuthModal();
  const promptedRef = useRef(false);
  const emailUser = user?.email;

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(emailUser ?? "", { skip: !emailUser });

  useEffect(() => {
    if (user) promptedRef.current = false;
    if (!loading && !user && !promptedRef.current) {
      promptedRef.current = true;
      openAuth("login");
    }
  }, [user, loading, openAuth]);

  if (!loading && !user) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold">Lịch sử đơn hàng</h1>
        <p className="text-gray-600">Vui lòng đăng nhập để xem đơn hàng của bạn.</p>
        <button type="button" onClick={() => openAuth("login")} className="cst_btn-primary">Đăng nhập</button>
      </section>
    );
  }

  if (loading || isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="animate-pulse text-gray-600">Đang tải đơn hàng...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500">Đã xảy ra lỗi khi tải dữ liệu đơn hàng.</p>
      </div>
    );
  }

 

  return (
    <section className="min-h-screen w-full py-10 px-4 flex justify-center ">
      <div className="w-full max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Lịch sử đơn hàng của bạn
          </h1>
        </div>

        {orders.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
          </div>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-100 rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                <h2 className="font-semibold text-gray-800">
                  Mã đơn:{" "}
                  <span className="font-mono text-primary">
                    {order._id.slice(-8).toUpperCase()}
                  </span>
                </h2>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {new Date(order.createdAt!).toLocaleDateString("vi-VN")}
                </span>
              </div>

              <div className="text-gray-700 space-y-2 mb-6">
                <p className="flex justify-between text-sm">
                  <span className="text-gray-500">Phương thức thanh toán:</span>
                  <span className="font-medium">
                    {order.payment === "cod"
                      ? "Thanh toán khi nhận hàng (COD)"
                      : order.payment === "ATM"
                        ? "Chuyển khoản ngân hàng"
                        : order.payment}
                  </span>
                </p>
                <p className="flex justify-between text-sm">
                  <span className="text-gray-500">Tổng tiền:</span>
                  <span className="font-bold text-lg text-red-600">
                    ${order.totalPrice}
                  </span>
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                  Sản phẩm đã mua
                </p>
                <div className="space-y-3">
                  {order.productPay?.map((item, index) => {
                    const product = item.product as string | { _id: string };
                    const productId = typeof product === "string" ? product : product._id;

                    return (
                      <div
                        key={`${productId}-${index}`}
                        className="flex items-center gap-4 bg-gray-50/80 border border-gray-100 p-3 rounded-lg"
                      >
                        <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <Link
                            href={`/products/${productId}`}
                            className="hover:text-primary font-medium text-gray-800 line-clamp-2 transition-colors text-sm"
                          >
                            {item.name}
                          </Link>
                          <div className="text-sm text-gray-500 whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm border border-gray-100 self-start sm:self-auto">
                            Số lượng:{" "}
                            <span className="font-bold text-gray-800">
                              x{item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full py-4 flex items-center justify-center">
          <button onClick={() => router.push("/")} className="cst_btn-secondary-icon">
            <BsArrowLeft size={20} />
            Về trang chủ
          </button>
        </div>
      </div>
    </section>
  );
}
