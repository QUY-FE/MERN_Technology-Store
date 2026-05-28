import Image from "next/image";
import Link from "next/link";

import { Calendar, ChevronRight, Clock4 } from "lucide-react";

export default function NewsSection() {
  const news = [
    {
      id: 1,
      title: "Viettel Lạng Sơn bùng nổ ưu đãi lắp đặt Internet trong tháng này",
      date: "25/04/2026",
      image: "/casePC.jpg",
    },
    {
      id: 2,
      title: "Hướng dẫn đăng ký gói cước 5G siêu tốc độ tại khu vực Lạng Sơn",
      date: "24/04/2026",
      image: "/mouseGaming.jpg",
    },
    {
      id: 3,
      title: "Viettel đồng hành cùng chuyển đổi số nông nghiệp địa phương",
      date: "22/04/2026",
      image: "/mouseGaming2.jpg",
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto py-16 px-4">
      <div className="mt-16 mb-12">
        <div className="my-8 flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-2xl text-primary font-bold">
            <Clock4 />
            Tin tức nổi bật
          </h1>

          <Link href="/news" className="cst_btn-secondary-icon">
            Xem thêm <ChevronRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link
              href={`/news/${item.id}`}
              key={item.id}
              className="group flex flex-col"
            >
              <div className="relative w-full h-[220px] overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="mt-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>

                <h3 className="font-bold text-lg text-grayNormal group-hover:text-primary transition-colors line-clamp-2 min-h-[64px]">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
