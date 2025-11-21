"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";


// === Dữ liệu mẫu ===
const mockNewsData = [
  {
    id: 1,
    slug: "danh-gia-laptop-gaming-2025",
    imageUrl: "/laptop.jpg", // Thay bằng đường dẫn ảnh của bạn
    category: "Đánh giá",
    title: "Top 3 Laptop Gaming đáng mua nhất 2025",
    description:
      "Phân khúc laptop gaming đang sôi động hơn bao giờ hết. Hãy cùng Qn Shop điểm qua...",
  },
  {
    id: 2,
    slug: "thu-thuat-tang-toc-window-11",
    imageUrl: "/laptop.jpg", // Thay bằng đường dẫn ảnh của bạn
    category: "Thủ thuật",
    title: "5 Mẹo đơn giản giúp tăng tốc Windows 11",
    description:
      "Laptop của bạn chạy chậm? Đừng lo, hãy áp dụng ngay 5 mẹo sau đây để cải thiện...",
  },
];

// =================================

const ITEMS_PER_PAGE = 12; 

export default function NewsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Tính toán phân trang
  const totalPages = Math.ceil(mockNewsData.length / ITEMS_PER_PAGE);
  
  const paginatedNews = mockNewsData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Xử lý chuyển trang
  const goToPage = (page : number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto py-8 px-4">
      {/* Tiêu đề section */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl text-primary font-semibold border-l-4 border-red-600 pl-3">
          Tin Tức & Đánh Giá
        </h2>
       
      </div>

      {/* Grid tin tức */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {paginatedNews.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block h-full" // Dùng block để thẻ a bao trọn thẻ article
          >
            <article
              className="
                bg-white rounded-xl shadow-md overflow-hidden 
                flex flex-col h-full
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100
              "
            >
              {/* Ảnh thumbnail */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Badge Category đè lên ảnh (Tùy chọn style) */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {post.category}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                {/* Tiêu đề */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {post.title}
                </h3>

                {/* Mô tả ngắn */}
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                  {post.description}
                </p>
                
               
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Phân trang UI */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Dùng text nếu chưa cài lucide-react: "<" */}
            <BiChevronLeft size={20} /> 
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`
                w-8 h-8 rounded-md flex items-center justify-center font-medium transition-colors
                ${currentPage === page 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'}
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
             {/* Dùng text nếu chưa cài lucide-react: ">" */}
            <BiChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}