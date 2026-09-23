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
    <nav className="hidden h-full flex-1 lg:block">
      <ul className="flex h-full items-center justify-center gap-1 xl:gap-3">
        {list.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.id} className="h-full">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex h-full items-center justify-center px-2 text-sm font-medium transition-colors duration-200 xl:px-3 xl:text-[15px] ${
                  isActive ? "text-gray-950" : "text-gray-600 hover:text-gray-950"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-3 left-2 right-2 h-px origin-center bg-gray-950 transition-transform duration-200 xl:left-3 xl:right-3 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
