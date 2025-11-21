"use client";
import { useAuth } from "#/context/authContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  FaShoppingCart,
  FaBell,
  FaUserAltSlash,
} from "react-icons/fa";
import { LuCircleUser } from "react-icons/lu";
import { useAppSelector } from "#/hooks/redux.hook";
import Search from "./Search";

const fakeNotifications = [
  { id: 1, title: "Tặng bạn voucher 20%", content: "Cảm ơn bạn đã tin dùng Qn shop", isNew: false },
  { id: 2, title: "Sắp có đợt khuyến mãi lớn", content: "Ngày 11/11 sắp tới, đừng bỏ lỡ!", isNew: true },
  { id: 3, title: "Đơn hàng đã được giao", content: "Đơn hàng #12345 đã được giao thành công", isNew: true },
];

export default function Action() {
  const { user, logout } = useAuth();
  const [avatarDropdown, setAvatarDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart);
  const avatarRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

 
  // Click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="flex items-center gap-3 relative">
      <Search />

      {/* Cart */}
      {user && (
        <Link
          href="/cart"
          className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 transition-transform duration-300 hover:scale-105"
        >
          <FaShoppingCart
            className={`text-gray-700 ${pathname === "/cart" ? "text-orange-500 scale-110" : ""}`}
            size={25}
          />
          {items.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-1.5 rounded-full animate-pulse">
              {items.length}
            </span>
          )}
        </Link>
      )}

      {/* Avatar dropdown */}
      <div className="relative" ref={avatarRef}>
        <button
          onClick={() => setAvatarDropdown(!avatarDropdown)}
          className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 transition-transform duration-300 hover:scale-105"
        >
          {user ? (
            <LuCircleUser
              size={25}
              className={`transition-transform duration-300 ${
                pathname === "/profile" ? "scale-110 text-orange-500" : "text-gray-700"
              }`}
            />
          ) : (
            <FaUserAltSlash size={25} />
          )}
        </button>

        {avatarDropdown && (
          <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg border border-gray-200 rounded-lg z-50 animate-fade-in-down">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-t-lg"
                  onClick={() => setAvatarDropdown(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={() => setAvatarDropdown(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setAvatarDropdown(false);
                    router.push("/login");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-b-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-lg"
                onClick={() => setAvatarDropdown(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Notifications */}
      {user && (
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifDropdown(!notifDropdown)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 transition-transform duration-300 hover:scale-105"
          >
            <FaBell size={22} />
            {fakeNotifications.some((n) => n.isNew) && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full animate-pulse">
                {fakeNotifications.filter((n) => n.isNew).length}
              </span>
            )}
          </button>

          {notifDropdown && (
            <div className="absolute right-0 mt-2 w-80 max-h-96 bg-white shadow-lg border border-gray-200 rounded-lg overflow-y-auto z-50 animate-fade-in-down">
              <p className="text-center font-semibold py-2 border-b border-gray-200">
                Thông báo
              </p>
              <ul>
                {fakeNotifications.map((n) => (
                  <li
                    key={n.id}
                    className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 relative"
                  >
                    <h4 className="font-semibold text-gray-800">{n.title}</h4>
                    <p className="text-gray-600 text-sm">{n.content}</p>
                    {n.isNew && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                        Mới
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
