"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsFire } from "react-icons/bs"; // Import thêm icon cho sidebar
import BlogLoading from "./BlogLoading";

// === Dữ liệu mẫu (Đã thêm data để test hiển thị) ===
const mockNewsData = [
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
    description: "Laptop của bạn chạy chậm? Đừng lo, hãy áp dụng ngay...",
  },
  {
    id: 3,
    slug: "macbook-air-m3",
    imageUrl: "/laptop.jpg",
    category: "Review",
    title: "Đánh giá MacBook Air M3: Pin trâu, hiệu năng đỉnh",
    description: "Apple Silicon tiếp tục khẳng định vị thế với dòng chip M3...",
  },
  {
    id: 4,
    slug: "build-pc-giare",
    imageUrl: "/laptop.jpg",
    category: "PC Build",
    title: "Cấu hình PC 15 triệu chiến mọi game AAA",
    description: "Tối ưu chi phí với combo Intel và NVIDIA mới nhất...",
  },
  // ... Bạn có thể thêm nhiều data hơn để test phân trang
];

const sidebarNews = [
    "Rò rỉ thông tin iPhone 16 Pro Max: Camera zoom 10x?",
    "Giá Bitcoin lập đỉnh mới, thị trường linh kiện PC biến động",
    "Windows 12 sẽ tích hợp AI sâu vào hệ thống",
    "NVIDIA ra mắt dòng card đồ họa RTX 5000 series"
];

// ================================= 

const ITEMS_PER_PAGE = 12; 

export default function NewsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
      }, []);
    
      if (loading) {
        return <BlogLoading />;
      }
  // Tính toán phân trang
  const totalPages = Math.ceil(mockNewsData.length / ITEMS_PER_PAGE);

  const paginatedNews = mockNewsData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Xử lý chuyển trang
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Tùy chọn: Scroll lên đầu khi chuyển trang
      // window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto py-8 px-4">
      {/* Tiêu đề section */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-2xl text-primary font-bold border-l-4 border-red-600 pl-3 uppercase tracking-wide">
          Tin Tức & Đánh Giá
        </h2>
      </div>

      {/* === LAYOUT CHÍNH: GRID 7/3 === */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        
        {/* === CỘT TRÁI (Main Content + Phân trang): Chiếm 7 phần === */}
        <div className="lg:col-span-7">
            {/* Grid tin tức: 3 cột */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
                {paginatedNews.map((post) => (
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
                        {/* Tiêu đề nhỏ lại */}
                        <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
                        {post.title}
                        </h3>

                        {/* Mô tả ngắn */}
                        <p className="text-gray-500 text-xs mb-3 flex-grow line-clamp-3">
                        {post.description}
                        </p>
                         
                         {/* Footer card nhỏ */}
                        <div className="text-[10px] text-gray-400 mt-auto">
                            Xem chi tiết &rarr;
                        </div>
                    </div>
                    </article>
                </Link>
                ))}
            </div>

            {/* Phân trang UI (Nằm gọn trong cột trái) */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 border-t border-gray-100 pt-6">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <BiChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`
                        w-8 h-8 rounded-md flex items-center justify-center font-medium transition-colors text-sm
                        ${
                        currentPage === page
                            ? "bg-red-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 border"
                        }
                    `}
                    >
                    {page}
                    </button>
                ))}

                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <BiChevronRight size={20} />
                </button>
                </div>
            )}
        </div>

        {/* === CỘT PHẢI (Aside): Chiếm 3 phần === */}
        <aside className="lg:col-span-3 space-y-8">
             {/* Block 1: Tin vắn */}
             <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
                    <BsFire className="text-red-500" />
                    <h4 className="font-bold text-gray-800 text-sm uppercase">Tin nóng 24h</h4>
                </div>
                <ul className="space-y-3">
                    {sidebarNews.map((item, index) => (
                        <li key={index} className="group cursor-pointer">
                            <Link href="#" className="flex gap-2 items-start">
                                <span className="text-gray-300 font-bold text-sm">0{index + 1}.</span>
                                <span className="text-sm text-gray-600 font-medium group-hover:text-red-600 transition-colors line-clamp-2">
                                    {item}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Block 2: Quảng cáo */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden group cursor-pointer my-4 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-xs text-indigo-300 border border-indigo-300 px-2 py-0.5 rounded mb-2">Sponsored</span>
                    <h5 className="text-white font-bold text-xl mb-1">Tech Deal 2026</h5>
                    <p className="text-indigo-200 text-sm mb-3">Săn sale sập sàn</p>
                    <button className="bg-white text-indigo-900 text-xs font-bold px-4 py-2 rounded-full group-hover:scale-105 transition-transform">
                        Xem ngay
                    </button>
                </div>
            </div>

             {/* Block 3: Có thể thêm Top đánh giá */}
             {/* <div className="bg-white">
                <div className="flex items-center gap-2 mb-3">
                    <BsStarFill className="text-yellow-400 text-sm" />
                    <h4 className="font-bold text-gray-800 text-sm uppercase">Được quan tâm</h4>
                </div>
                <div className="flex gap-3 mb-3 border-b border-gray-100 pb-3">
                    <div className="w-16 h-12 bg-gray-200 rounded shrink-0 relative overflow-hidden">
                         <Image src="/laptop.jpg" alt="thumb" fill className="object-cover" />
                    </div>
                    <div>
                         <h5 className="text-xs font-bold hover:text-red-600 cursor-pointer line-clamp-2">Cách tối ưu pin laptop Windows 11</h5>
                    </div>
                </div>
             </div> */}
        </aside>

      </div>
    </section>
  );
}