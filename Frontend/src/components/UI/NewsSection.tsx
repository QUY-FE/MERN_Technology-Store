import Image from "next/image";
import Link from "next/link";

import { Calendar, ChevronRight, Clock4 } from "lucide-react";
import { useGetAllNewsQuery } from "#/redux/features/newsApi";
import getImageUrl from "#/utils/getImageUrl";

export default function NewsSection() {
  
  const { data: news = [], isLoading } = useGetAllNewsQuery(undefined);

  return (
    <section className="max-w-[1200px] mx-auto  px-2">
      <div className=" mb-12">
        <div className="my-8 block lg:flex items-center justify-between">
          <h1 className="flex items-center gap-2 py-2 text-2xl text-primary font-bold">
            <Clock4 />
            Tin tức nổi bật
          </h1>

          <Link href="/news" className="cst_btn-secondary-icon">
            Xem thêm <ChevronRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.slice(0,3).map((post) => (
            <Link
              href={`/news/${post._id}`}
              key={post._id}
              className="group flex flex-col"
            >
              <div className="relative w-full h-[220px] overflow-hidden rounded-2xl">
                <Image
                  src={getImageUrl(post.thumbnail)}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="mt-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <Calendar size={14} />
                  <span>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</span>
                </div>

                <h3 className="font-bold text-lg text-grayNormal group-hover:text-primary transition-colors line-clamp-2 min-h-[64px]">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
