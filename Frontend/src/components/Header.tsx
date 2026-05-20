"use client";
import Link from "next/link";

import Sales from "#/components/Sales";
import Navbar from "./Header/Navbar";
import Action from "./Header/Action";
import NavbarMobile from "./Header/NavbarMobile";
import { Clock, Info, Package, Phone } from "lucide-react";
const navbarListDefault = [
  {
    id: 4,
    icon: Package,
    name: "Sản phẩm",
    href: "/products",
  },
  {
    id: 5,
    icon: Clock,
    name: "Bài viết",
    href: "/blog",
  },
  {
    id: 2,
    icon: Info,
    name: "Về Qn",
    href: "/about",
  },
  {
    id: 3,
    icon: Phone,
    name: "Liên hệ",
    href: "/contact",
  },
];
export default function Header() {
  return (
    <header id="Home" className="sticky top-0 z-[1000] bg-white">
      <Sales
        // hasSales
        totalSales={28}
        titleSales="Giảm giá cực sốc trong mùa xuân này với đồ Gaming "
      />
      <div className="sticky top-0 z-[1000] border-b-2 border-gray-100">
        <div className="max-w-[1200px] h-[80px] mx-auto  flex items-center ">
          {/* Navbar mobile */}
          <NavbarMobile list={navbarListDefault} />
          {/* Logo */}
          <div className="w-5/12 lg:w-1/12 h-full justify-center  flex items-center lg:justify-start  text-xl lg:text-left lg:text-2xl font-semibold">
            <Link
              href="/"
              className="px-2 pb-1  bg-gradient-to-tr from-orange-400 to-red-400 text-white rounded-tl-xl rounded-br-2xl"
            >
              QN.PC
            </Link>
          </div>
          {/* navbar */}
          <Navbar list={navbarListDefault} />
          {/* action */}
          <Action />
        </div>
      </div>
    </header>
  );
}
