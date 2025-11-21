import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

// === Dữ liệu mẫu (Mock Data)
const mockNewsData = [
  {
    id: 1,
    slug: "danh-gia-laptop-gaming-2025",
    imageUrl: "/laptop.jpg", 
    category: "Đánh giá",
    title: "Top 3 Laptop Gaming đáng mua nhất 2025",
    description:
      "Phân khúc laptop gaming đang sôi động hơn bao giờ hết. Hãy cùng Qn Shop điểm qua...",
  },
  {
    id: 2,
    slug: "thu-thuat-tang-toc-window-11",
    imageUrl: "/laptop.jpg", 
    category: "Thủ thuật",
    title: "5 Mẹo đơn giản giúp tăng tốc Windows 11",
    description:
      "Laptop của bạn chạy chậm? Đừng lo, hãy áp dụng ngay 5 mẹo sau đây để cải thiện...",
  },
];
// =================================

export default function NewsSection() {
  return (
    <section className="max-w-[1200px] mx-auto py-16 px-4">
      {/* Tiêu đề section */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl text-primary font-semibold">
          Tin Tức & Đánh Giá
        </h2>
        <Link
          href="/blog"
          className="
            font-semibold text-red-600 
            hover:text-red-800 transition-colors
            flex items-center gap-1
          "
        >
          Xem tất cả
          <BsArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockNewsData.slice(0,4).map((post) => (
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
                <div className="absolute top-2 left-2 bg-red-400 text-white text-xs font-bold px-2 py-1 rounded">
                    {post.category}
                </div>
                <div className="absolute top-2 right-2 bg-gradient-to-r from-red-400 to-orange-400 text-white text-xs font-bold px-2 py-1 rounded">
                    Hot
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
    </section>
  );
}
