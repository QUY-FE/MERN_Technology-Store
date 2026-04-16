"use client";
import Link from "next/link";
import { useAuth } from "#/context/authContext";
import { useAppSelector } from "#/hooks/redux.hook";
import Search from "./Search";
import Image from "next/image";
import { GrCart } from "react-icons/gr";
// import { BiSearchAlt } from "react-icons/bi";

export default function Action() {
  const { user } = useAuth();
  const { items } = useAppSelector((state) => state.cart);

  return (
    <div className="w-9/12 h-full lg:w-5/12 flex items-center lg:justify-start justify-end pr-4 gap-1.5 ">
      <Search />

      {/* search mobile */}
      {/* <button className="w-10 h-10 flex items-center justify-center rounded-full">
        <BiSearchAlt size={24} />
      </button> */}
      {/* Cart */}
      {user && (
        <Link
          href="/cart"
          className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 transition-transform duration-300 hover:scale-105"
        >
          <GrCart size={24} />
          {items.length > 0 && (
            <span className="absolute top-0.5 right-0 bg-gradient-to-tr from-orange-400 to-red-400 text-white text-xs font-semibold px-1.5 rounded-full animate-pulse">
              {items.length}
            </span>
          )}
        </Link>
      )}
      {/* Profile */}
      <Link
        href={"/profile"}
        className=" w-10 h-10 flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
      >
        {/* <LuCircleUser size={25} className={`text-gray-700 ${pathname === "/profile" ? "text-orange-500 scale-110" : ""}`} /> */}
        <Image
          src={user?.photoURL || "/default_avatar.jpg"}
          alt="Avatar"
          width={32}
          height={32}
          className={` rounded-full object-cover `}
        />
      </Link>
    </div>
  );
}
