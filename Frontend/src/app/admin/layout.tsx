"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoExitOutline, IoWarningOutline, IoMenu, IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import { LuUser } from "react-icons/lu";
import { CgShoppingCart } from "react-icons/cg";
import { BiPackage } from "react-icons/bi";
import { ChartNoAxesCombined, Clock10, Phone } from "lucide-react";

const MENU = [
  {
    icon: <ChartNoAxesCombined size={24} />,
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <BiPackage size={24} />,
    name: "Sản phẩm",
    path: "/admin/products",
  },
  {
    icon: <CgShoppingCart size={24} />,
    name: "Đơn hàng",
    path: "/admin/orders",
  },
  {
    icon: <Clock10 size={24} />,
    name: "Tin tức",
    path: "/admin/news",
  },
  {
    icon: <Phone size={24} />,
    name: "Liên hệ",
    path: "/admin/contacts",
  },
  {
    icon: <LuUser size={24} />,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && pathname !== "/admin") {
      router.replace("/admin");
      return;
    }
    if (token && pathname === "/admin") {
      router.replace("/admin/dashboard");
    }
  }, [pathname, router]);

  // Tự động đóng menu mobile khi chuyển trang
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    const toastId = toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center gap-4 p-4 min-w-[300px]">
          <div className="flex items-center gap-2 text-primary">
            <IoWarningOutline size={32} />
            <span className="font-bold text-lg">Xác nhận đăng xuất</span>
          </div>
          <p className="text-base text-gray-700 text-center">
            Bạn có muốn thoát khỏi trang Admin?
          </p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                toast.dismiss(toastId);
                toast.info("Bạn đã rời khỏi trang Admin");
                router.push("/admin");
              }}
              className="cst_btn-primary px-4 py-2 bg-primary text-white rounded-md hover:opacity-90"
            >
              Đăng xuất
            </button>
            <button
              onClick={() => toast.dismiss(toastId)}
              className="cst_btn px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
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
      }
    );
  };

  const renderNavLinks = (isMobileView = false) => {
    return MENU.map((item) => {
      const isActive = pathname === item.path;

      return (
        <Link
          key={item.path}
          href={item.path}
          title={item.name}
          className={`flex items-center gap-3 p-3 md:px-4 md:py-2 rounded-lg transition-all duration-300 ease-in-out
            ${
              isActive
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md font-medium"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"
            } ${isMobileView ? "justify-start" : "justify-center"}`}
        >
          {item.icon}
          <span className={`${!isMobileView ? "hidden md:block" : "block"} text-sm`}>
            {item.name}
          </span>
        </Link>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <ToastContainer
        position="top-right"
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
        <header className="sticky top-0 z-[1000] bg-white w-full h-[64px] flex items-center justify-between px-4 md:px-6 border-b border-gray-200 shadow-sm">
          
          {/* Nút Hamburger cho Mobile */}
          <div className="flex-shrink-0 md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
            </button>
          </div>

          {/* Navigation Section (Desktop) */}
          <nav className="hidden md:flex flex-1 items-center gap-2 md:gap-4 px-2">
            {renderNavLinks(false)}
          </nav>

          {/* Spacer trên mobile để đẩy nút đăng xuất sang phải */}
          <div className="flex-1 md:hidden"></div>

          {/* Action Section */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={handleLogout}
              title="Đăng xuất"
              className="flex items-center justify-center p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
            >
              <IoExitOutline size={26} />
            </button>
          </div>

          {/* Navigation Section (Mobile Dropdown) */}
          {isMobileMenuOpen && (
            <>
              {/* Overlay Backdrop */}
              <div 
                className="fixed inset-0 top-[64px] bg-black/20 z-[900] md:hidden backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Dropdown Menu */}
              <nav className="absolute top-[64px] left-0 w-full bg-white border-b border-gray-200 shadow-lg z-[1000] flex flex-col p-4 gap-2 md:hidden animate-in slide-in-from-top-2 duration-200">
                {renderNavLinks(true)}
              </nav>
            </>
          )}
        </header>
      )}

      {/* Main Content */}
      <main
        className={`w-full mx-auto ${
          !isLoginPage ? "p-0 md:p-6 min-h-[calc(100vh-64px)]" : "min-h-screen"
        }`}
      >
        <div className="bg-white rounded-xl shadow-sm min-h-full border border-gray-100">
          {children}
        </div>
      </main>
    </div>
  );
}