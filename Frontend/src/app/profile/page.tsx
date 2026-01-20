"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "#/context/authContext";
import Image from "next/image";
// Import React Icons
import { 
  FaClipboardList, 
  FaKey, 
  FaPhoneAlt, 
  FaCamera, 
  FaSignOutAlt, 
  FaBell 
} from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth(); // Giả sử context có hàm logout
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // 1. Khai báo Array chứa các menu settings
  const menuItems = [
    { id: 2, href: "/orders", label: "Đơn mua", icon: <FaClipboardList />, color: "text-orange-500" },
    { id: 3, href: "/", label: "Đổi mật khẩu", icon: <FaKey />, color: "text-yellow-500" },
    { id: 4, href: "/", label: "Thêm số điện thoại", icon: <FaPhoneAlt />, color: "text-green-500" },
    { id: 6, href: "/notifications", label: "Thông báo", icon: <FaBell />, color: "text-red-500" },
    { id: 7, href: "/admin", label: "Quản lý", icon: <FaUserTie />, color: "text-red-500" },
  ];

  const handleLogout = () => {
    if (!confirm("Bạn có chắc muốn đăng xuất tài khoản ?")) return;
    try {
      logout?.();
      toast.info('Hẹn gặp lại bạn sau nhé!')
      router.push("/");
    } catch (error) {
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!')
      console.error("Logout error:", error);
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">Đang tải...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <section className="min-h-screen w-full bg-[#f5f5f5] py-8">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-6">
        
        {/* SIDEBAR BÊN TRÁI - 1/4 màn hình */}
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="flex items-center space-x-4 mb-8 px-2">
            <div className="relative w-12 h-12">
              <Image
                src={user.photoURL || "/men_avatar.jpg"}
                alt="Avatar"
                fill
                className="rounded-full object-cover border border-gray-200"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 truncate w-32">
                {user.username || "User Name"}
              </span>
              <button className="text-xs text-gray-500 flex items-center hover:text-orange-500 transition">
                <FaCamera className="mr-1" /> Sửa hồ sơ
              </button>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
              href={item.href}
                key={item.id}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all group"
              >
                <span className={`text-lg ${item.color} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
            
            <hr className="my-4 border-gray-200" />
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="text-sm font-medium">Đăng xuất</span>
            </button>
          </nav>
        </aside>

        {/* NỘI DUNG CHÍNH BÊN PHẢI - 3/4 màn hình */}
        <main className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-8 min-h-[600px]">
            {/* Header của content */}
            <div className="border-b pb-4 mb-8">
              <h2 className="text-xl font-semibold text-gray-800">Hồ sơ của tôi</h2>
              <p className="text-sm text-gray-500 mt-1">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Form căn trái */}
              <div className="flex-1 space-y-8 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
                  <label className="text-gray-500 text-sm md:text-right">ID tài khoản</label>
                  <div className="text-gray-800 font-medium bg-gray-50 p-2 rounded border border-dashed truncate">
                    {user.id}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
                  <label className="text-gray-500 text-sm md:text-right">Tên đăng nhập</label>
                  <input 
                    type="text" 
                    defaultValue={user.username || ""} 
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
                  <label className="text-gray-500 text-sm md:text-right">Email</label>
                  <div className="text-gray-800">{user.email} <span className="text-blue-500 text-xs ml-2 cursor-pointer">Thay đổi</span></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
                  <label className="text-gray-500 text-sm md:text-right">Trạng thái</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 w-fit">
                    Đang hoạt động
                  </span>
                </div>

                <div className="md:ml-[150px] pt-4">
                  <button className="cst_btn-primary px-6 py-2"> 
                    Lưu thay đổi
                  </button>
                </div>
              </div>

              {/* Avatar bên phải của content (optional) */}
              <div className="hidden lg:flex flex-col items-center border-l w-64 ml-8 space-y-4">
                <div className="relative w-24 h-24">
                   <Image
                    src={user.photoURL || "/men_avatar.jpg"}
                    alt="Avatar Large"
                    fill
                    className="rounded-full object-cover border-2 border-gray-100"
                  />
                </div>
                <button className="border border-gray-300 px-4 py-2 text-sm rounded text-gray-600 hover:bg-gray-50">
                  Chọn ảnh
                </button>
                <div className="text-center text-xs text-gray-400 space-y-1">
                  <p>Dụng lượng file tối đa 1 MB</p>
                  <p>Định dạng: .JPEG, .PNG</p>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </section>
  );
}