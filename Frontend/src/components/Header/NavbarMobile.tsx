"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { usePathname } from "next/navigation";
export default function NavbarMobile({
  list = [],
}: {
  list?: { id: number; name: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
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

  return (
    <nav className="w-3/12 sm:block lg:hidden h-full flex items-center pl-4">
      <button
        className="flex h-full items-center text-black/85"
        onClick={() => setIsOpen(true)}
      >
        <IoIosMenu size={32} />
      </button>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-2/3 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-[80px] px-4 border-b border-gray-100">
          <button
            className="flex items-center text-black/85 hover:text-gray-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <IoIosClose size={36} />
          </button>
          <Link
            href="/"
            className="px-3 py-2 bg-gradient-to-tr from-orange-400 to-red-400 text-white rounded-xl text-lg font-semibold "
          >
            Qn
          </Link>
        </div>

        {/* Danh sách các Link */}
        <ul className="flex-1 overflow-y-auto py-4">
          {list.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)} // Đóng menu sau khi điều hướng
                className={`block w-full px-8 py-3 text-lg font-semibold transition-colors rounded-lg ${
                  pathname === item.href
                    ? "text-black bg-gray-200"
                    : "text-gray-600  "
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="container mx-auto p-2 flex flex-col md:flex-row justify-between items-center gap-0.5 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Qn Shop. All rights reserved.</p>
          <p>
            Make by <Link href="https://github.com/QUY-FE" target="_blank" className="text-orange-500 hover:underline">Quý Nguyễn</Link>
          </p>
        </div>
      </div>
    </nav>
  );
}
