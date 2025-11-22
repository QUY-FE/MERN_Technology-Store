"use client";
import Image from "next/image";
import Button from "#/components/Button";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "#/hooks/redux.hook";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "#/redux/features/cartSlice";
import { useCallback } from "react";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  const handleQuantityChange = useCallback(
    (id: string, value: number) => {
      const qty = value > 0 ? value : 1;
      dispatch(updateQuantity({ id, quantity: qty }));
    },
    [dispatch]
  );

  const handleRemove = useCallback(
    (id: string) => {
      dispatch(removeFromCart(id));
      toast.info("Đã xoá sản phẩm khỏi giỏ hàng");
    },
    [dispatch]
  );

  const handleClear = () => {
    if (items.length === 0) {
      toast.warning("Giỏ hàng đã rỗng");
      return;
    }
    if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
      dispatch(clearCart());
      toast.success("Đã xóa toàn bộ giỏ hàng");
    }
  };

  if (items.length === 0) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Giỏ hàng trống</h2>
        <Link href="/products">
          <Button w={218} h={56} text="Tiếp tục mua sắm" />
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto">
      <div className="mt-6 flex items-center justify-between">
        <Link href="/">
          <Button w={180} h={46} text="Quay về trang chủ" />
        </Link>
        <Button
          w={180}
          h={46}
          primary
          text="Xoá Giỏ hàng"
          onClick={handleClear}
        />
      </div>

      <ul className="w-full h-[72px] shadow flex items-center justify-between mt-10 rounded-2xl text-center">
        <li className="w-1/4">Sản phẩm</li>
        <li className="w-1/4">Giá</li>
        <li className="w-1/4">Số lượng</li>
        <li className="w-1/4">Tổng tiền</li>
      </ul>

      {items.map((item) => (
        <article
          className="w-full max-h-[120px] shadow-lg rounded-2xl flex items-center my-4  p-2 lg:p-4"
          key={item.id}
        >
          <div className="w-1/4 h-full  block lg:flex items-start gap-2.5">
            <Image
              src={`/${item.image}` || "/not_found.png"}
              alt={item.name || "Sản phẩm"}
              width={65}
              height={65}
              className="object-contain"
            />
            <div className="text-sm font-semibold">{item.name}</div>
          </div>

          <div className="w-1/4 h-full flex items-center justify-center font-semibold">
            <p>${item.price}</p>
          </div>

          <div className="w-1/4 h-full flex items-center justify-center font-semibold gap-2">
            <input
              type="number"
              value={item.quantity}
              min={1}
              className="w-[40px] outline outline-[1.7px] pl-2 outline-black/90 rounded"
              onChange={(e) =>
                handleQuantityChange(item.id, Number(e.target.value))
              }
            />
            <button
              className="p-2 rounded hover:bg-red-50 text-red-600"
              onClick={() => handleRemove(item.id)}
              title="Xóa"
            >
              <FaTrash />
            </button>
          </div>

          <div className="w-1/4 h-full flex items-center justify-center font-semibold">
            <p>${item.price * item.quantity}</p>
          </div>
        </article>
      ))}

      <div className="my-4 flex flex-col lg:flex-row items-start lg:items-center gap-8">
        <div className="w-full lg:w-1/2">
          {/* Nếu muốn thêm voucher / coupon UI tiếp tục dùng ở đây */}
        </div>

        <div className="w-full lg:w-1/2 flex justify-end">
          <div className="px-6 py-8 border-[1.8px] rounded shadow-lg w-full max-w-md">
            <h1 className="text-2xl">Hoá đơn</h1>
            <div className="flex items-center justify-between border-b-2 border-[#b3b3b3] py-5">
              <p>Tạm tính</p>
              <p>${totalPrice}</p>
            </div>
            <div className="flex items-center justify-between border-b-2 border-[#b3b3b3] py-5">
              <p>Ship</p>
              <p>Free</p>
            </div>

            <div className="flex items-center justify-between font-bold mt-4 mb-6">
              <p>Tổng cộng</p>
              <p className="text-primary">${totalPrice}</p>
            </div>

            <div className="flex justify-center">
              <Link href="/products/checkout">
                <Button primary w={218} h={56} text="Thanh toán" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
