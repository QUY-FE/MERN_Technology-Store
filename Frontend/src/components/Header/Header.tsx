"use client";
import Link from "next/link";
import Image from "next/image";
import { Clock, Info, Package, Phone } from "lucide-react";

import Sales from "#/components/Sales";
import Navbar from "./Navbar";
import Action from "./Action";
import NavbarMobile from "./NavbarMobile";

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
    name: "Tin tức",
    href: "/blog",
  },
  {
    id: 2,
    icon: Info,
    name: "Giới thiệu",
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
        hasSales
        totalSales={28}
        titleSales="Giảm giá cực sốc trong mùa xuân này với đồ Gaming"
      />
      
      <div className="sticky top-0 z-[1000] border-b-2 border-gray-100 bg-white">
        <div className="mx-auto flex h-[80px] max-w-[1200px] items-center px-4 xl:px-0">
          {/* Navbar mobile */}
          <NavbarMobile list={navbarListDefault} />
          
          {/* Logo Section */}
          <div className="flex h-full w-full max-w-[240px] items-center justify-center lg:w-auto lg:justify-start">
            <Link href="/" className="block">
              <Image
                src="/LOGO_qn.png"
                alt="Logo QN Computer"
                width={240} 
                height={80} 
                className="h-10 w-auto object-contain md:h-12 lg:h-14" 
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