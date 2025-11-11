"use client";
import { useAuth } from "#/context/authContext";
import { useProducts } from "#/context/productContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaSearch,
  FaBell,
  FaUserAltSlash,
} from "react-icons/fa";

import { LuCircleUser } from "react-icons/lu";
import { TiDelete } from "react-icons/ti";

import useDeboune from "#/hooks/useDeboune";
import { useAppSelector } from "#/hooks/redux.hook";


const fakeNotifications = [
  {
    id: 1,
    title: "Tặng bạn vocher giảm 20%",
    content: "Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của Qn shop",
    isNew: false,
  },
  {
    id: 2,
    title: "Sắp có đợt khuyến mãi lớn",
    content: "Ngày 11/11 sắp tới, đừng bỏ lỡ cơ hội mua sắm với giá ưu đãi nhé!",
    isNew: true,
  },
];


export default function Action() {
  const { products } = useProducts();
  const { user } = useAuth();
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const debounceQuery = useDeboune(keyword, 700);
  const pathname = usePathname();
  const { items } = useAppSelector((state) => state.cart);

  // Gọi API search sản phẩm khi debounceQuery thay đổi
  useEffect(() => {
    if (debounceQuery) {
      console.log("Search for:", debounceQuery);
      // call API sau
    }
  }, [debounceQuery]);

  const handleDeleteInput = (field: string) => {
    if (field === "keyword") setKeyword("");
  };

  return (
    <section className="w-3/12 lg:w-5/12 h-full flex items-center justify-between gap-2  px-2 lg:px-4">
      {/* // Phần search */}
      <div className="relative bg-[#f5f5f5] hidden rounded-lg lg:flex items-center px-2 py-1 group  transition-all duration-200">
        <input
          type="text"
          value={keyword}
          name="keyword"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
          placeholder="Bạn cần tìm gì?"
          className="w-[240px] h-[38px] px-2 outline-none bg-[#f5f5f5]"
        />
        {keyword.length > 0 ? (
          <p
            onClick={() => handleDeleteInput("keyword")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10"
          >
            <TiDelete size={26} />
          </p>
        ) : (
          <p className="w-10 h-10"></p>
        )}
        <button className="w-10 h-10 text-black/70 px-2 hover:bg-black/10 rounded-full active:bg-black/15">
          <FaSearch className="mx-auto text-primary" size={20} />
        </button>

        {/* Dropdown Search */}
        <div className="absolute top-14 left-0 w-full max-h-screen bg-gray-100 rounded-md shadow-lg z-50 p-2 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300">
          <p className="text-sm text-primary font-semibold mb-2">Hot</p>
          <ul className="mb-2">
            {products.map((product) => (
              <li key={product?._id}>
                <Link
                  href={`/products/${product?.slug}`}
                  className="py-2 pl-2 text-black/75 rounded-md hover:bg-black/10 block"
                >
                  {product?.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Phần cart */}
        {user ? (
          <Link
            href={"/cart"}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 active:bg-black/15"
          >
            <FaShoppingCart className="pb-1 transition mx-auto" size={25} />

            {items.length > 0 && (
              <p className="absolute top-[4px] right-0  text-white text-xs bg-gradient-to-r from-red-400 to-orange-400 px-1 rounded-full">
                {items.length}
              </p>
            )}
            <div
              className={`${
                pathname === "/cart" ? "block" : "hidden"
              } w-full h-[3px] absolute bottom-0 left-0 rounded-full bg-gradient-to-r from-red-500 to-orange-400`}
            ></div>
          </Link>
        ) : null}
        {/* profile user */}
        <Link
          href={user ? "/profile" : "/login"}
          className="relative w-10 h-10 flex items-center justify-center  rounded-full hover:bg-black/10"
        >
          {user ? <LuCircleUser size={25} /> : <FaUserAltSlash size={25} />}
          <div
            className={`${
              pathname === "/profile" ? "block" : "hidden"
            } w-full h-[3px] absolute bottom-0 left-0 rounded-full bg-gradient-to-r from-red-500 to-orange-400`}
          ></div>
        </Link>
        {user ? (
          <>
            <button
              onClick={() => setDropdown(!dropdown)}
              className="relative w-10 h-10 flex items-center justify-center  rounded-full hover:bg-black/10"
            >
              <FaBell size={22} />
              <p className="absolute top-[4px] right-[4px]  text-white text-xs bg-gradient-to-r from-red-400 to-orange-400 px-1 rounded-full">
                {fakeNotifications.length}
              </p>
            </button>
            <div
              className={`${
                dropdown ? "block" : "hidden"
              } absolute px-2  top-[90px] right-[350px] w-[380px]  rounded-md shadow-lg bg-white z-50`}
            >
              <p className="text-center font-semibold text-sm py-2 border-b-2 border-red-200 ">
                Thông báo
              </p>
              <ul>
                {
                  fakeNotifications.map((notification) => (
                    <li key={notification.id} className="relative py-4 px-2 my-2 rounded-md text-xs shadow-md">
                      <h1 className="font-semibold text-primary text-[16px] mb-2">
                        {notification.title}  
                      </h1>
                      <p>{notification.content}</p>
                      <span className={`${notification.isNew ? "block" : "hidden" } absolute -top-1 -right-2 px-1 py-1 bg-red-400 text-white rounded-md text-xs`}>
                        Mới
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
