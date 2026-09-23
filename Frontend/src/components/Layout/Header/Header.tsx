"use client";
import Link from "next/link";
import Image from "next/image";

import Sales from "#/components/Common/Sales";
import Navbar from "./Navbar";
import Action from "./Action";
import NavbarMobile from "./NavbarMobile";

const navbarListDefault = [
  {
    id: 1,
    name: "Trang chủ",
    href: "/",
  },
  {
    id: 2,
    name: "Sản phẩm",
    href: "/products",
  },
  {
    id: 3,
    name: "Tin tức",
    href: "/news",
  },
  {
    id: 4,
    name: "Giới thiệu",
    href: "/about",
  },
  {
    id: 5,
    name: "Liên hệ",
    href: "/contact",
  },
];

export default function Header() {
  return (
    <header id="Home" className="sticky top-0 z-[1000] bg-white">
      <Sales
        hasSales
        totalSales={28}
        titleSales="Giảm giá cực sốc trong mùa xuân này với đồ Gaming"
      />

      <div className="bg-white px-2 py-2 sm:px-4 sm:py-3">
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center gap-2 bg-white px-2 sm:h-[68px] sm:px-0 lg:gap-5">
          {/* Navbar mobile */}
          <NavbarMobile list={navbarListDefault} />

          {/* Logo Section */}
          <div className="flex h-full min-w-0 flex-1 items-center justify-center lg:max-w-[190px] lg:flex-none lg:justify-start">
            <Link href="/" className="block" aria-label="Về trang chủ QN Shop">
              <Image
                src="/LOGO_qn.png"
                alt="Logo QN Computer"
                width={240}
                height={80}
                className="h-9 w-auto max-w-[145px] object-contain sm:h-10 sm:max-w-[170px] lg:max-w-[190px]"
                priority
              />
            </Link>
          </div>

          {/* Navbar Desktop */}
          <Navbar list={navbarListDefault} />

          {/* Action (Cart, User, etc.) */}
          <Action />
        </div>
      </div>
    </header>
  );
}
