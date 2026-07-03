"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Eye } from "lucide-react";
import { useParams } from "next/navigation";
import { BsFire } from "react-icons/bs";
import getImageUrl from "#/utils/getImageUrl";
import {
  useGetAllNewsQuery,
  useGetOneNewsQuery,
} from "#/redux/features/newsApi";

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: news, isLoading } = useGetOneNewsQuery(id);
  const { data: newsData = [] } = useGetAllNewsQuery(undefined);

  const topNews = newsData.filter((post) => post._id !== news?._id).slice(0, 5);

  const hasSideNews = topNews.length > 0;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500 animate-pulse">
        Đang tải bài viết...
      </div>
    );
  }

  if (!news) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        Không tìm thấy bài viết.
      </div>
    );
  }
  
  const sentences = news.content
  ? news.content.split(".").filter((s: string) => s.trim() !== "")
  : [];
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <article className={hasSideNews ? "lg:col-span-8" : "lg:col-span-12"}>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-4 border-b border-gray-200">
              <span className="flex items-center gap-1.5">
                <Calendar size={16} />
                {new Date(news.createdAt).toLocaleDateString("vi-VN")}
              </span>
              <span className="flex items-center gap-1.5">
                <User size={16} />
                {news.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={16} />
                {news.views} lượt xem
              </span>
            </div>
          </div>

          <div className={`relative w-full mb-10 rounded-xl overflow-hidden shadow-sm ${hasSideNews ? 'h-[400px]' : 'h-[500px]'}`}>
            <Image
              src={getImageUrl(news.thumbnail)}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="text-gray-700 text-lg leading-relaxed space-y-6">
            {sentences.map((sentence: string, index: number) => (
              <p key={index} className="text-justify">
                {sentence.trim()}.
              </p>
            ))}
          </div>
        </article>

        {hasSideNews && (
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <BsFire className="text-red-500 text-lg" />
                <h4 className="font-bold text-gray-800 text-base uppercase tracking-wide">
                  Xem nhiều nhất
                </h4>
              </div>

              <ul className="space-y-5">
                {topNews.map((item: any, index: number) => (
                  <li key={item._id} className="group">
                    <Link
                      href={`/news/${item._id}`}
                      className="flex gap-4 items-start"
                    >
                      <span className="text-2xl font-black text-gray-200 group-hover:text-red-500 transition-colors leading-none">
                        0{index + 1}
                      </span>
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h5>
                        <span className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                          <Eye size={12} /> {item.views} lượt xem
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
        
      </div>
    </div>
  );
}