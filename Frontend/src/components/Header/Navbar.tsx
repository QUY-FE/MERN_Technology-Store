"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({
  list = [],
}: {
  list?: { id: number; name: string; href: string }[];
}) {
  const pathname = usePathname();
  return (
    <nav className="hidden lg:block  lg:w-6/12 h-full leading-20 ">
      <ul className=" flex items-center justify-center h-full gap-3 ">
        {list.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.id} className="relative">
              <Link
                href={item.href}
                className={`relative p-3 text-sm transition-all duration-300 ease-in-out 
                  ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  } 
                  hover:scale-[1.05]`}
              >
                {item.name}

                {/* underline hiệu ứng mượt */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-red-400 to-orange-400 transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    }`}
                ></span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
