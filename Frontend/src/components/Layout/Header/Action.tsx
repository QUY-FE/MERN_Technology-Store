"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Package, LogOut, Bell } from "lucide-react";
import { useAuth } from "#/context/authContext";
import { useAppSelector } from "#/hooks/redux.hook";
import Search from "./Search";
import { useAuthModal } from "#/context/authModalContext";


const menuItems = [
  {
    title: "Quản lý tài khoản",
    href: "/profile",
    icon: <User size={18} className="text-gray-400" />,
  },
  {
    title: "Đơn hàng",
    href: "/orders",
    icon: <Package size={18} className="text-gray-400" />,
  },
  {
    title: "Thông báo",
    href: "/notifications",
    icon: <Bell size={18} className="text-gray-400" />,
  }
]


export default function Action() {
  const { user, logout } = useAuth();
  const { items } = useAppSelector((state) => state.cart);

  const { openAuth } = useAuthModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (logout) logout();
  };

  return (
    <>
      <div className="flex h-full shrink-0 items-center justify-end gap-0.5 sm:gap-1">
        <Search />

        <Link
          href="/cart"
          aria-label="Xem giỏ hàng"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-900 transition-colors hover:bg-gray-100"
        >
          <ShoppingCart size={24} />
          {items.length > 0 && (
            <span className="absolute top-0.5 right-0 bg-gradient-to-tr from-primary to-secondary text-white text-xs font-semibold px-1.5 rounded-full animate-pulse">
              {items.length}
            </span>
          )}
        </Link>

        {user ? (
          <div ref={dropdownRef} className="relative hidden lg:flex">
            {/* Nút trigger mở dropdown */}
            <button
              onClick={() => setIsDropdownOpen((current) => !current)}
              aria-label="Mở menu tài khoản"
              aria-expanded={isDropdownOpen}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 focus:outline-none"
            >
              <Image
                src={user?.photoURL || "/default_avatar.jpg"}
                alt="Avatar user"
                width={32}
                height={32}
                className="rounded-full object-cover border border-gray-200"
              />
            </button>

            {/* Nội dung Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.username || "Người dùng"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "Chưa cập nhật email"}
                  </p>
                </div>

                <div className="py-2">
                  {
                    menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    ))
                  }
                  
                </div>

                <div className="py-2 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut size={18} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => openAuth("login")}
            className="cst_btn-primary hidden lg:inline-flex"
          >
            Đăng nhập
          </button>
        )}
      </div>

    </>
  );
}
