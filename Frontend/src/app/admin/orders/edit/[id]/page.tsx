"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";
import { Save, FileText, User} from "lucide-react";
import {
    useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "#/redux/features/ordersApi";
import type { OrderFormData } from "#/types";

const statusOptions = ["Đang xử lý", "Hoàn thành", "Đã hủy"];

export default function EditOrderPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: orders = [], isLoading } = useGetAllOrdersQuery(); 
  const [updateOrder] = useUpdateOrderMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<OrderFormData>();

  const order = orders.find((o: any) => o._id === id);

  useEffect(() => {
    if (order) {
      setValue("username", order?.username);
      setValue("email", order?.email);
      setValue("phone", order?.phone);
      setValue("address", order?.address);
      setValue("status", order?.status || "Đang xử lý");
    }
  }, [order, setValue]);

  const onSubmit = async (data: OrderFormData) => {
    try {
      await updateOrder({ id, updatedOrder: data }).unwrap();
      toast.success("Cập nhật đơn hàng thành công");
      router.push("/admin/orders");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật đơn hàng thất bại");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">
          Đang tải thông tin đơn hàng...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 flex flex-col items-center justify-center">
        <FileText size={48} className="text-gray-300 mb-4" />
        <p className="text-lg text-gray-600 font-medium">
          Không tìm thấy đơn hàng
        </p>
        <Link
          href="/admin/orders"
          className="mt-4 text-primary hover:underline text-sm"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl  p-6 md:p-8">
        <div className="flex items-center justify-between mb-8 pb-4 ">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Chi tiết & Cập nhật đơn hàng</h1>
            <p className="text-sm text-gray-500 mt-1">
              Mã đơn:{" "}
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {order._id}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Ngày đặt hàng</p>
            <p className="font-medium text-gray-800">
              {order.createdAt ? new Date(order.createdAt).toLocaleString("vi-VN") : "N/A"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              
              <div className="p-5 rounded-xl border border-blue-100 bg-blue-50/30">
                <label className="block font-semibold text-sm text-gray-800 mb-2">
                  Trạng thái xử lý <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("status", { required: true })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm bg-white font-medium"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <User size={20} className="text-gray-500" />
                  Thông tin khách hàng
                </h2>
                
                <div>
                  <label className=" font-medium text-sm text-gray-700 mb-1.5 flex items-center gap-2">
                    Họ và tên
                  </label>
                  <input
                    {...register("username", { required: true })}
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                  />
                  {errors.username && <span className="text-xs text-red-500 mt-1">Bắt buộc</span>}
                </div>

                <div>
                  <label className=" font-medium text-sm text-gray-700 mb-1.5 flex items-center gap-2">
                    Số điện thoại
                  </label>
                  <input
                    {...register("phone", { required: true })}
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                  />
                  {errors.phone && <span className="text-xs text-red-500 mt-1">Bắt buộc</span>}
                </div>

                <div>
                  <label className=" font-medium text-sm text-gray-700 mb-1.5 flex items-center gap-2">
                    Email liên hệ
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                  />
                  {errors.email && <span className="text-xs text-red-500 mt-1">Bắt buộc</span>}
                </div>

                <div>
                  <label className=" font-medium text-sm text-gray-700 mb-1.5 flex items-center gap-2">
                    Địa chỉ giao hàng
                  </label>
                  <textarea
                    {...register("address", { required: true })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none h-24"
                  />
                  {errors.address && <span className="text-xs text-red-500 mt-1">Bắt buộc</span>}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Sản phẩm đã đặt
              </h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {order.productPay?.map((item: any) => (
                    <div key={item._id} className="flex justify-between items-center py-2 border-b border-gray-200/60 last:border-0 last:pb-0">
                      <div className="flex-1 pr-4">
                        <p className="font-medium text-sm text-gray-800 line-clamp-2">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Mã SP: {item.product}</p>
                      </div>
                      <div className="text-sm font-semibold text-gray-700">
                        x{item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phương thức thanh toán:</span>
                    <span className="font-medium uppercase text-gray-800">{order.payment}</span>
                  </div>
                  {order.coupon && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Mã giảm giá áp dụng:</span>
                      <span className="font-medium text-green-600">{order.coupon}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-gray-800 font-semibold">Tổng tiền thanh toán:</span>
                    <span className="text-xl font-bold text-red-500">
                      ${order.totalPrice?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link href={"/admin/orders"} className="cst_btn ">
              Hủy
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cst_btn-primary-icon"
            >
              <Save size={18} />
              {isSubmitting ? "Đang xử lý..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}