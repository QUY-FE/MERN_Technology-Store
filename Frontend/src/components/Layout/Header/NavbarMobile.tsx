"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { LogIn } from "lucide-react";
import { useAuth } from "#/context/authContext";
import { useAuthModal } from "#/context/authModalContext";
import type { SocialItem } from "#/types";

export default function NavbarMobile({
  list = [],
}: {
  list?: { id: number; name: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { openAuth } = useAuthModal();
  
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Khóa cuộn trang khi mở menu mobile.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOpenLoginModal = () => {
    setIsOpen(false);
    openAuth("login");
  };

  const socialArr: SocialItem[] = [
    {
      name: "Facebook",
      icon: <FaFacebook size={20} color="#0866ff" />,
      link: "https://www.facebook.com",
    },
    {
      name: "TikTok",
      icon: <FaTiktok size={16} color="#000000" />,
      link: "https://www.tiktok.com",
    },
  ];

  return (
    <>
      <nav className="flex h-full shrink-0 items-center lg:hidden">
        <button
          type="button"
          aria-label="Mở menu điều hướng"
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-900 transition-colors hover:bg-gray-100"
          onClick={() => setIsOpen(true)}
        >
          <IoIosMenu size={32} />
        </button>

        {/* Overlay cho Menu Mobile */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Khung Menu Mobile trượt */}
        <div
          className={`fixed top-0 left-0 h-full w-4/5 sm:w-2/3 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-[60px] px-4 border-b border-gray-100">
            <button
              type="button"
              aria-label="Đóng menu điều hướng"
              className="flex items-center text-black/85 hover:text-gray-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <IoIosClose size={36} />
            </button>

            {/* Xử lý Auth UI trên Menu Mobile */}
            {user ? (
              <Link
                href={"/profile"}
                className="flex items-center justify-center gap-2 p-2 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={user?.photoURL || "/default_avatar.jpg"}
                  alt="Avatar user"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <span className="font-medium text-gray-800 text-sm">{user?.username}</span>
              </Link>
            ) : (
              <button
                onClick={handleOpenLoginModal}
                className="cst_btn-primary-icon"
              >
                <LogIn size={20} />
                <span className="text-sm">Đăng nhập</span>
              </button>
            )}
          </div>

          {/* Danh sách các Link */}
          <ul className="flex-1 overflow-y-auto py-4">
            {list.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`mx-3 flex rounded-lg px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? "bg-gray-100 font-semibold text-gray-950"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Footer Mobile Menu */}
          <div className="p-4 flex flex-col gap-3 text-xs text-gray-500 border-t border-gray-100 bg-gray-50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p>Theo dõi thêm tại: </p>
              <div className="flex items-center gap-2">
                {socialArr.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    aria-label={item.name}
                    className="flex h-8 w-8 items-center justify-center bg-white rounded-full shadow-sm transition-all hover:scale-105"
                  >
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <p>&copy; {new Date().getFullYear()} Qn Shop. All rights reserved.</p>
              <p>
                Make by{" "}
                <Link
                  href="https://github.com/QUY-FE"
                  target="_blank"
                  className="text-primary hover:underline font-medium"
                >
                  Quý Nguyễn
                </Link>
              </p>
            </div>
          </div>
        </div>
      </nav>

    </>
  );
}
