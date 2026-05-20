"use client";
import Link from "next/link";
import { useAuth } from "#/context/authContext";
import { useAppSelector } from "#/hooks/redux.hook";
import Search from "./Search";
import Image from "next/image";
import { LogIn, ShoppingCart } from "lucide-react";

export default function Action() {
  const { user } = useAuth();
  const { items } = useAppSelector((state) => state.cart);

  return (
    <div className="w-4/12 h-full lg:w-5/12 flex items-center justify-end lg:pr-0 pr-2 gap-1.5 ">
      <Search />

      <Link
        href="/cart"
        className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 transition-transform duration-300 hover:scale-110"
      >
        <ShoppingCart size={22} />
        {items.length > 0 && (
          <span className="absolute top-0.5 right-0 bg-gradient-to-tr from-orange-400 to-red-400 text-white text-xs font-semibold px-1.5 rounded-full animate-pulse">
            {items.length}
          </span>
        )}
      </Link>

      <Link
        href={"/profile"}
        className=" w-10 h-10 flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
      >
        {user ? (
          <Image
            src={user?.photoURL || "/default_avatar.jpg"}
            alt="Avatar user"
            width={32}
            height={32}
            className={` rounded-full object-cover `}
          />
        ) : (
          <LogIn />
        )}
      </Link>
    </div>
  );
}
