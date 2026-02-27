import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import NewsSectionLoading from "./NewsSectionLoading";

// === Dữ liệu mẫu (Đã nhân bản để test hiển thị 3 cột) ===

// =================================

export default function NewsSection() {
  const [loading, setLoading] = useState(true);

  const mockNewsData = useMemo(
    () => [
      {
        id: 1,
        slug: "danh-gia-laptop-gaming-2025",
        imageUrl: "/laptop.jpg",
        category: "Đánh giá",
        title: "Top 3 Laptop Gaming đáng mua nhất 2025",
        description: "Phân khúc laptop gaming đang sôi động hơn bao giờ hết...",
      },
      {
        id: 2,
        slug: "thu-thuat-tang-toc-window-11",
        imageUrl: "/laptop.jpg",
        category: "Thủ thuật",
        title: "5 Mẹo đơn giản giúp tăng tốc Windows 11",
        description: "Laptop chạy chậm? Áp dụng ngay 5 mẹo sau...",
      },
      // Clone thêm data để test UI 3 cột
      {
        id: 3,
        slug: "macbook-m3-review",
        imageUrl: "/laptop.jpg",
        category: "Review",
        title: "Đánh giá chi tiết MacBook Air M3: Quá mạnh mẽ",
        description: "Apple silicon tiếp tục thống trị với thời lượng pin...",
      },
      {
        id: 4,
        slug: "build-pc-giare",
        imageUrl: "/laptop.jpg",
        category: "PC Build",
        title: "Cấu hình PC 15 triệu chiến mọi game AAA",
        description: "Tối ưu chi phí với combo Intel và NVIDIA mới nhất...",
      },
    ],
    [],
  );

  // const sidebarNews = [
  //     "Rò rỉ thông tin iPhone 16 Pro Max: Camera zoom 10x?",
  //     "Giá Bitcoin lập đỉnh mới, thị trường linh kiện PC biến động",
  //     "Windows 12 sẽ tích hợp AI sâu vào hệ thống",
  //     "NVIDIA ra mắt dòng card đồ họa RTX 5000 series"
  // ];
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <NewsSectionLoading />;
  }
  return (
    <section className="max-w-[1200px] mx-auto py-16 px-4">
      {/* Header Section giữ nguyên */}
      <div className="flex justify-between items-end mb-8 border-b pb-4 border-gray-200">
        <div>
          <h2 className="text-2xl text-red-600 font-bold uppercase tracking-wide">
            Tin Tức & Đánh Giá
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Cập nhật công nghệ mới nhất mỗi ngày
          </p>
        </div>

        <Link
          href="/blog"
          className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1"
        >
          Xem tất cả
          <BsArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* === GRID LAYOUT CHÍNH: 7/3 === */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* === CỘT TRÁI (Main Content): Chiếm 7 phần === */}
        <div className="lg:col-span-7">
          {/* Grid con: 3 thẻ trên 1 hàng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {mockNewsData.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <article className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
                  {/* Ảnh thumbnail - Giảm height xuống h-40 */}
                  <div className="relative w-full h-40 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-3 flex flex-col flex-grow">
                    {/* Tiêu đề nhỏ lại (text-base) */}
                    <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {/* Mô tả ngắn & nhỏ hơn */}
                    <p className="text-gray-500 text-xs mb-3 flex-grow line-clamp-3">
                      {post.description}
                    </p>

                    <div className="text-[10px] text-gray-400 mt-auto flex items-center gap-1">
                      <span>12/01/2026</span> • <span>5 phút đọc</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* === CỘT PHẢI (Aside): Chiếm 3 phần === */}
        <aside className="lg:col-span-3 space-y-8">
          {/*  Quảng cáo */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden group cursor-pointer my-[2px]">
            {/* Giả lập banner quảng cáo */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col items-center justify-center text-center p-4">
              <span className="text-xs text-indigo-300 border border-indigo-300 px-2 py-0.5 rounded mb-2">
                Quảng cáo
              </span>
              <h5 className="text-white font-bold text-xl mb-1">
                Mừng Xuân 2026
              </h5>
              <p className="text-indigo-200 text-sm mb-3">
                Giảm giá lên đến 50%
              </p>
              <button className="bg-white text-indigo-900 text-xs font-bold px-4 py-2 rounded-full group-hover:scale-105 transition-transform">
                Mua ngay
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
