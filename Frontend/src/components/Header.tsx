"use client";
import Link from "next/link";

import Sales from "#/components/Sales";
import Navbar from "./Header/Navbar";
import Action from "./Header/Action";
import NavbarMobile from "./Header/NavbarMobile";


const navbarListDefault = [
  {
    id: 1,
    name: "Trang chủ",
    href: "/",
  },
  {
    id: 4,
    name: "Sản phẩm",
    href: "/products",
  },
  {
    id: 5,
    name: "Blog",
    href: "/blog",
  },
  {
    id: 2,
    name: "Về Qn",
    href: "/about",
  },
  {
    id: 3,
    name: "Liên hệ",
    href: "/contact",
  },
];
export default function Header() {

  return (
    <header id="Home">
      <Sales
        hasSales
        totalSales={50}
        titleSales="Giảm giá cực sốc trong mùa hè này với đồ gaming "
      />
      <div className="border-b-2 border-colorBorder">
        <div className="max-w-[1200px] h-[80px] mx-auto  flex items-center ">
          {/* Navbar mobile */}
          <NavbarMobile
            list={navbarListDefault }
          />
          {/* Logo */}
          <div className="w-6/12 lg:w-1/12 h-full  flex items-center lg:justify-start md:justify-center text-2xl lg:text-left lg:text-2xl font-semibold">
            <Link
              href="/"
              className="px-3 py-2 bg-gradient-to-tr from-orange-400 to-red-400 text-white rounded-xl"
            >
              Qn
            </Link>
          </div>
          {/* navbar */}
          <Navbar list={navbarListDefault } />
          {/* action */}
          <Action />
        </div>
      </div>
    </header>
  );
}
