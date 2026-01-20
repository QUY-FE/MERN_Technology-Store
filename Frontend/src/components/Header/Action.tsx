"use client";
import { useAuth } from "#/context/authContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "#/hooks/redux.hook";
import Search from "./Search";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";


export default function Action() {
  const { user } = useAuth();
  const pathname = usePathname();
  const { items } = useAppSelector((state) => state.cart);


  return (
    <div className="w-5/12 flex items-center justify-between gap-3 ">
      <Search />
      <div className="flex items-center gap-2">
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
      {/* Profile */}
      <Link
        href={"/profile"}
        className=" w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 transition-transform duration-300 hover:scale-105"
      >
        {/* <LuCircleUser size={25} className={`text-gray-700 ${pathname === "/profile" ? "text-orange-500 scale-110" : ""}`} /> */}
        <Image src={user?.photoURL || "/default_avatar.jpg"} 
        alt="Avatar" 
        width={40} 
        height={40} 
        className={`${user ? "ring-green-400" : "ring-red-300"} rounded-full ring-2  object-cover border border-gray-200`} />
        
      </Link>
      </div>
    </div>
  );
}
