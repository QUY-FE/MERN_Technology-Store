"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoExitOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import avartar from '../../assets/images/men_avatar.jpg'
import Image from "next/image";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin"); // đá về trang login
    } 
  }, [pathname,router]);

  const handleLogout = () => {
    if (!confirm("Bạn có muốn thoát ?")) return;
    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout error:", error);
    }
    toast.info('Bạn đã rời khỏi trang Admin')
    router.push("/");
  };
  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Sản phẩm", path: "/admin/products" },
    { name: "Đơn hàng", path: "/admin/orders" },
    { name: "Người dùng", path: "/admin/users" },
  ];

  return (
    <>
      {pathname === "/admin" ? null : (
        <header className=" w-full h-[60px] flex justify-between border-b-2 border-gray-100">
          <div className="w-2/12 h-full flex items-center p-5">
            <Link
              href=""
              className="px-3 py-2 font-bold text-xl bg-gradient-to-tr from-orange-400 to-red-400 text-white rounded-xl"
            >
              Qn
            </Link>
          </div>
          <div className="w-8/12 h-full py-2 px-5"></div>
          <div className="w-2/12 h-full p-5 flex items-center justify-end gap-4">
            <div className="flex justify-end items-center gap-1">
              <Image src={avartar} alt="avatar" width={40} height={40} className="rounded-full "></Image>
              <p className="text-xl font-semibold">admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10"
            >
              <IoExitOutline size={25} />
            </button>
          </div>
        </header>
      )}
      <div className="min-h-screen flex">
        {/* Sidebar */}
        {pathname === "/admin" ? null : (
          <aside className="w-2/12 p-5 ">
            <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
            <nav className="space-y-2">
              {menu.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-3 py-2 rounded ${
                    pathname === item.path
                      ? "bg-primary text-white font-bold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 p-5">{children}</main>
      </div>
    </>
  );
}
