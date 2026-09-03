"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "#/hooks/redux.hook";
import { clearCart } from "#/redux/features/cartSlice";
import { useAuth } from "#/context/authContext";
import { useForm } from "react-hook-form";
import { checkoutValidation } from "#/utils/validation";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "#/redux/features/ordersApi";
import { RiCoupon3Line } from "react-icons/ri";
import getImageUrl from "#/utils/getImageUrl";
import Login from "#/components/Common/Login";
import type { CheckoutForm } from "#/types";

export default function Checkout() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      address: "",
      phone: "",
      status: "Đang xử lý",
    },
  });

  const [payment, setPayment] = useState<"bank" | "cod">("cod");
  const [coupon, setCoupon] = useState("");

 

  const handerHasUser = () => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để đặt hàng");
      setIsModalOpen(true);
      return;
    }
  };

  const onSubmit = async (data: CheckoutForm) => {
    const newOrder = {
      ...data,
      payment,
      productPay: items.map((cartItem) => ({
        product: cartItem?.id,
        name: cartItem?.name,
        quantity: cartItem?.quantity,
      })),
      totalPrice: totalPrice,
      coupon,
      status: "Đang xử lý",
    };

    try {
      await createOrder(newOrder).unwrap();
      dispatch(clearCart());
      reset();
      toast.success("Đơn hàng đang được xử lý");
      router.replace("/products");
    } catch (err) {
      console.error("Lỗi khi đặt hàng:", err);
      toast.error("Có lỗi xảy ra khi đặt hàng.");
    }
  };

  const handleApplyCoupon = () => {
    toast.info(`Áp dụng mã: ${coupon || "(rỗng)"}`);
  };



   if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
        <button
          onClick={() => router.push("/products")}
          className="cst_btn-secondary"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }
  return (
    <>
      <form
        className="max-w-6xl px-2 mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Left: form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Thông tin đơn hàng</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium">
                Họ & tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("username", checkoutValidation.username)}
                className="w-full bg-gray-100 outline-none rounded-md px-3 py-2 focus:bg-gray-200"
              />
              {errors.username && (
                <p className="text-red-400">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", checkoutValidation.email)}
                className="w-full bg-gray-100 outline-none rounded-md px-3 py-2 focus:bg-gray-200"
              />
              {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("address", checkoutValidation.address)}
                className="w-full bg-gray-100 outline-none rounded-md px-3 py-2 focus:bg-gray-200"
              />
              {errors.address && (
                <p className="text-red-400">{errors.address.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("phone", checkoutValidation.phone)}
                className="w-full bg-gray-100 outline-none rounded-md px-3 py-2 focus:bg-gray-200"
              />
              {errors.phone && (
                <p className="text-red-400">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="save-info"
                {...register("saveInfo")}
                className="h-4 w-4 text-red-500 border-gray-300 rounded"
              />
              <label htmlFor="save-info" className="text-sm">
                Lưu thông tin này để kiểm tra nhanh hơn lần sau
              </label>
            </div>
          </div>
        </div>

        {/* Right: payment + cart summary */}
        <div className="p-6 bg-white rounded shadow">
          <div className="mb-4">
            <h3 className="font-semibold mb-3">Sản phẩm</h3>
            <div className="space-y-3 max-h-72 overflow-auto pr-2">
              {items.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={getImageUrl(cartItem.image) || "/not_found.png"}
                      alt={cartItem.name}
                      width={48}
                      height={48}
                      className="object-cover rounded"
                    />
                    <div className="text-sm">
                      <div className="font-medium">{cartItem.name}</div>
                      <div className="text-gray-500 text-xs">
                        Số lượng: {cartItem.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold">
                    ${cartItem.price * cartItem.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-4 border-t border-b my-4">
            <div className="flex items-center justify-between mb-2">
              <p>Tổng tiền</p>
              <p className="font-semibold">${totalPrice}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Tiền ship</p>
              <p>Free</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Phương thức thanh toán</h4>
            <label className="flex items-center gap-3 mb-2">
              <input
                type="radio"
                name="payment"
                disabled
                checked={payment === "bank"}
                onChange={() => setPayment("bank")}
                className="h-4 w-4 text-primary"
              />
              <span className="flex items-center gap-2">
                Bank
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                  className="object-cover"
                  width={32}
                  height={20}
                  alt="visa"
                />
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/0/02/Mastercard-logo.svg"
                  className="object-cover"
                  width={32}
                  height={20}
                  alt="mastercard"
                />
              </span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
                className="h-4 w-4 text-primary"
              />
              <span>Thanh toán khi nhận hàng</span>
            </label>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <input
              type="text"
              placeholder="Nhập mã phiếu"
              className="px-4 py-2 outline-none rounded-md flex-1 bg-black/10"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              type="button"
              className="cst_btn-secondary-icon"
              onClick={handleApplyCoupon}
            >
              <RiCoupon3Line size={24} />
              Áp dụng phiếu giảm giá
            </button>
          </div>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              className="cst_btn"
              onClick={() => router.push("/products")}
            >
              Quay lại
            </button>
            <button
              onClick={handerHasUser}
              className="cst_btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Xác nhận thanh toán"}
            </button>
          </div>
        </div>
      </form>

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-transparent animate-in fade-in zoom-in duration-200"
          >
            <Login onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
