"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { IoExitOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import { IoWarningOutline } from "react-icons/io5";
import {  LuUser } from "react-icons/lu";
import { CgShoppingCart } from "react-icons/cg";
import { BiPackage } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";

const MENU = [
  {
    icon: <FaRegBell size={24} />,
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <BiPackage size={26} />,
    name: "Sản phẩm",
    path: "/admin/products",
  },
  {
    icon: <CgShoppingCart size={26} />,
    name: "Đơn hàng",
    path: "/admin/orders",
  },
  {
    icon: <LuUser size={26} />,
    name: "Người dùng",
    path: "/admin/users",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && !isLoginPage) {
      router.push("/admin");
    }
  }, [router, isLoginPage]);

 
  const handleLogout = () => {
    const toastId = toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center gap-4 p-4 min-w-[300px]">
          <div className="flex items-center gap-2 text-orange-600">
            <IoWarningOutline size={32} />
            <span className="font-bold text-lg">Xác nhận đăng xuất</span>
          </div>
          <p className="text-base text-gray-700">Bạn có muốn thoát khỏi trang Admin?</p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                toast.dismiss(toastId);
                toast.info("Bạn đã rời khỏi trang Admin");
                router.push("/");
              }}
              className="cst_btn-primary"
            >
              Đăng xuất
            </button>
            <button
              onClick={() => toast.dismiss(toastId)}
              className="cst_btn"
            >
              Hủy
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center",
        closeButton: false,
        style: { boxShadow: "0 4px 24px 0 #0002", borderRadius: 16 },
        toastId: "logout-confirm",
      },
    );
  };

  const renderMenu = useMemo(
    () =>
      MENU.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center justify-center p-4 rounded-lg transition
              ${
                isActive
                  ? "bg-gradient-to-tr from-orange-400 to-orange-600 text-white font-bold"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
          >
            {item.icon}
          </Link>
        );
      }),
    [pathname],
  );

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      {!isLoginPage && (
        <header className="sticky top-0 z-[1000] bg-white w-full h-[60px] flex justify-between border-b border-colorBorder">
          <div className="w-2/12 h-full flex items-center gap-3 p-5">
            <Link
              href="/admin/dashboard"
              className="px-3 py-2 font-bold text-xl bg-gradient-to-tr from-orange-400 to-red-400 text-white rounded-xl"
            >
              Qn
            </Link>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
        </header>
      )}

      <div className="min-h-[calc(100vh-60px)] flex">
        {!isLoginPage && (
          <aside className="w-[80px] p-2 border-r border-colorBorder flex flex-col justify-between">
            <nav className="space-y-2">{renderMenu}</nav>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-4 rounded-lg hover:bg-gray-100 text-primary hover:font-bold transition"
            >
              <IoExitOutline size={25} />
            </button>
          </aside>
        )}

        <main className="flex-1 p-5">{children}</main>
      </div>
    </>
  );
}
