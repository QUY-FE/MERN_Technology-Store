"use client"
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BiChevronLeft, BiTag, BiUser } from "react-icons/bi";
import { CgLock } from "react-icons/cg";

// === GIẢ LẬP DATA (Thực tế bạn nên tách file này ra folder /data riêng để import vào) ===
const mockNewsData = [
  {
    id: 1,
    slug: "danh-gia-laptop-gaming-2025",
    imageUrl: "/laptop.jpg",
    category: "Đánh giá",
    title: "Top 3 Laptop Gaming đáng mua nhất 2025",
    date: "18/11/2025",
    author: "Admin QnShop",
    description: "lmao",
    // Nội dung HTML giả lập
    content: `
      <p>Năm 2025 đánh dấu sự bùng nổ của các dòng card đồ họa RTX 50-series, kéo theo sự nâng cấp mạnh mẽ của các dòng Laptop Gaming. Dưới đây là 3 cái tên sáng giá nhất:</p>
      <h3>1. Asus ROG Strix G16 (2025)</h3>
      <p>Vẫn giữ vững phong độ "quốc dân", dòng Strix năm nay nâng cấp hệ thống tản nhiệt 3 quạt cực mát...</p>
      <h3>2. Acer Nitro 5 Tiger New Gen</h3>
      <p>Ông vua phân khúc giá rẻ đã trở lại với diện mạo hoàn toàn mới...</p>
      <h3>3. Lenovo Legion 5 Pro</h3>
      <p>Không cần nói quá nhiều về Legion, màn hình 2K 240Hz chuẩn màu vẫn là điểm ăn tiền nhất...</p>
    `,
  },
  {
    id: 2,
    slug: "thu-thuat-tang-toc-window-11",
    imageUrl: "/laptop.jpg",
    category: "Thủ thuật",
    title: "5 Mẹo đơn giản giúp tăng tốc Windows 11",
    date: "17/11/2025",
    author: "Kỹ thuật viên",
    description: "lmao",
    content: `
      <p>Windows 11 tuy đẹp nhưng khá ngốn tài nguyên. Hãy thử tắt các hiệu ứng animation không cần thiết...</p>
    `,
  },
  // ... Thêm các bài khác tương tự để test
];
type Props = {
  params: { id: string }; // Folder tên là [id] nên ở đây phải là id
};
// === HÀM TẠO METADATA (SEO) ===
// Sửa lại hàm metadata như sau:
export async function GenerateMetadata({ params }: Props): Promise<Metadata>{
  const post = mockNewsData.find((p) => p.slug === params.id);
  if (!post) return { title: "Không tìm thấy bài viết" };
  return {
    title: `${post.title} | Qn Shop News`,
    description: post.description,
  };
}
// === COMPONENT CHÍNH ===
export default function BlogDetailPage() {
  // 1. Tìm bài viết dựa trên slug trên URL
  const { id } = useParams();
const post = mockNewsData.find((p) => p.slug === id);

  // 2. Nếu không thấy bài viết -> Chuyển hướng sang trang 404
  if (!post) {
  return <div className="text-center py-10 text-red-500">Không tìm thấy bài viết</div>;
}

  return (
    <main className="max-w-[1200px] mx-auto py-8 px-4">
      {/* Nút Quay lại */}
      <div className="mb-6">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors font-medium"
        >
          <BiChevronLeft size={20} className="mr-1" /> Quay lại tin tức
        </Link>
      </div>

      <article className="max-w-4xl mx-auto bg-white md:p-0">
        {/* Header bài viết */}
        <header className="mb-8 text-center md:text-left">
          <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            {post.category}
          </span>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-500 text-sm border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2">
              <BiUser size={18} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CgLock size={18} />
              <span>{post.date}</span>
            </div>
             <div className="flex items-center gap-2">
              <BiTag size={18} />
              <span>Tin công nghệ</span>
            </div>
          </div>
        </header>

        {/* Ảnh đại diện bài viết */}
        <div className="relative w-full h-[300px] md:h-[450px] mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority // Ưu tiên load ảnh này vì nó ở đầu trang (LCP)
          />
        </div>

        {/* Nội dung bài viết (Render HTML) */}
        {/* LƯU Ý: Để style đẹp cho phần này, bạn nên cài plugin: @tailwindcss/typography 
           và thêm class 'prose' vào div bên dưới.
           Hiện tại mình đang style thủ công một chút.
        */}
        <div 
          className="
            prose prose-lg max-w-none 
            prose-headings:font-bold prose-headings:text-gray-900 
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-red-600 prose-img:rounded-xl
          "
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        {/* Phần Share hoặc Footer bài viết */}
        <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="font-bold text-gray-900">Bạn thấy bài viết này thế nào?</p>
            {/* Có thể thêm nút Share Facebook/Zalo ở đây */}
        </div>
      </article>

      {/* Gợi ý bài viết liên quan (Optional) */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Lọc ra 3 bài khác bài hiện tại để hiển thị */}
             {mockNewsData
                .filter(p => p.id !== post.id)
                .slice(0, 3)
                .map(related => (
                    <Link key={related.id} href={`/blog/${related.slug}`} className="group">
                        <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                             <Image src={related.imageUrl} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform"/>
                        </div>
                        <h4 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">{related.title}</h4>
                    </Link>
                ))
             }
        </div>
      </div>
    </main>
  );
}