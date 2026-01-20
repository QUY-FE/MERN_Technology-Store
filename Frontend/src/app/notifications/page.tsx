"use client";
import { useState, useEffect } from "react";
import { useAuth } from "#/context/authContext"; // Giả sử path này đúng
import { useRouter } from "next/navigation";

// Icons
import {  FaBell, FaTicketAlt, FaBoxOpen, FaCheckDouble 
} from "react-icons/fa";

// MOCK DATA BAN ĐẦU
const initialNotifications = [
  { 
    id: 1, 
    title: "Tặng bạn voucher 20%", 
    content: "Cảm ơn bạn đã tin dùng Qn shop. Mã giảm giá đã được thêm vào ví voucher của bạn.", 
    isNew: false, 
    type: "voucher",
    time: "2 giờ trước"
  },
  { 
    id: 2, 
    title: "Sắp có đợt khuyến mãi lớn", 
    content: "Ngày 11/11 sắp tới, đừng bỏ lỡ cơ hội săn sale cực khủng lên đến 50%!", 
    isNew: true, 
    type: "promo",
    time: "30 phút trước"
  },
  { 
    id: 3, 
    title: "Đơn hàng đã được giao", 
    content: "Đơn hàng #12345 của bạn đã được giao thành công. Hãy đánh giá để nhận xu nhé!", 
    isNew: true, 
    type: "order",
    time: "Vừa xong"
  },
];

export default function NotificationPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  // State quản lý danh sách thông báo để tương tác (Đánh dấu đã đọc)
  const [notifications, setNotifications] = useState(initialNotifications);

  

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // Hàm xử lý "Đánh dấu đã đọc tất cả"
  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, isNew: false }));
    setNotifications(updated);
  };

  // Hàm xử lý đọc từng tin
  const handleReadOne = (id: number) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, isNew: false } : n
    );
    setNotifications(updated);
  };

  // Helper chọn icon dựa trên loại thông báo
  const getIcon = (type?: string) => {
    switch (type) {
      case 'voucher': return <FaTicketAlt className="text-orange-500" />;
      case 'order': return <FaBoxOpen className="text-blue-500" />;
      default: return <FaBell className="text-yellow-500" />;
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  return (
    <section className="min-h-screen w-full bg-[#f5f5f5] py-8">
      <div className="max-w-[1200px] mx-auto  flex flex-col md:flex-row gap-6">

        {/* === MAIN CONTENT === */}
        <main className="flex-1">
          <div className="bg-white rounded-sm shadow-sm min-h-[600px]">
            
            {/* Header */}
            <div className="border-b px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
              <div>
                 <h1 className="text-lg font-medium text-gray-800">Thông báo mới nhận</h1>
                 <p className="text-sm text-gray-500">Xem tất cả cập nhật về đơn hàng và ưu đãi</p>
              </div>
              <button 
                onClick={handleMarkAllRead}
                className="text-sm text-gray-500 hover:text-orange-500 flex items-center gap-1 transition"
              >
                <FaCheckDouble /> Đánh dấu đã đọc tất cả
              </button>
            </div>

            {/* Notification List */}
            <div className="divide-y divide-gray-100">
              {notifications.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <FaBell className="text-4xl mb-3 opacity-20"/>
                    <p>Bạn không có thông báo nào</p>
                 </div>
              ) : (
                notifications.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => handleReadOne(item.id)}
                    className={`group px-6 py-4 cursor-pointer transition hover:bg-gray-50 flex gap-4 items-start relative
                      ${item.isNew ? "bg-orange-50/40" : "bg-white"}
                    `}
                  >
                    {/* Icon Box */}
                    <div className={`mt-1 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border
                      ${item.isNew ? "bg-white border-orange-200" : "bg-gray-50 border-gray-100"}
                    `}>
                      <span className="text-xl">
                        {getIcon(item.type)}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`text-base mb-1 group-hover:text-orange-600 transition
                           ${item.isNew ? "font-bold text-gray-900" : "font-medium text-gray-600"}
                        `}>
                          {item.title}
                        </h3>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                          {item.time}
                        </span>
                      </div>
                      <p className={`text-sm line-clamp-2
                         ${item.isNew ? "text-gray-700" : "text-gray-500"}
                      `}>
                        {item.content}
                      </p>
                    </div>

                    {/* Red Dot Indicator */}
                    {item.isNew && (
                      <div className="absolute top-1/2 right-4 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full shadow-sm"></div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer Pagination (Optional) */}
            <div className="px-6 py-4 border-t text-center">
               <button className="text-sm text-gray-500 hover:text-orange-500 transition">
                  Xem thêm thông báo cũ hơn
               </button>
            </div>

          </div>
        </main>
      </div>
    </section>
  );
}