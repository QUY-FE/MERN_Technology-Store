'use client'
import Link from "next/link";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";

export default function NavbarMobile({list = []}: {list?: {id:number,name:string,href:string}[]}) {
    const [dropdown, setDropdown] = useState<boolean>(false);
    return(
         <nav className="w-3/12 sm:block lg:hidden h-full leading-20 flex items-center pl-4 relative">
            <span className="flex w-1/3 h-full items-center text-black/85 " onClick={() => setDropdown(!dropdown)}>
              <IoIosMenu size={25} />
              {dropdown && (
                <>
                  {/* Overlay để đóng dropdown khi click ra ngoài */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdown(false)}
                  />
                  {/* Dropdown menu */}
                  <div className="w-screen bg-white shadow-md absolute top-[80px] left-0 rounded-md px-2 py-4 z-20">
                    {/* <h1 className="text-2xl font-semibold text-center mt-3 mb-5 pb-3 border-b-[2.5px] border-colorBorder">Menu</h1> */}
                    <ul>
                      {list.map((item) => (
                        <li
                          className="text-lg font-bold"
                          key={item.id}
                        >
                          <Link
                            href={item.href}
                            className="w-full h-full block text-lg px-8 py-2 active:bg-black/10"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </span>
          </nav>
    );
}