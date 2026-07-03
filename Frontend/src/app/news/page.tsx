"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import NewsLoading from "./newsLoading";
import { useGetAllNewsQuery } from "#/redux/features/newsApi";
import getImageUrl from "#/utils/getImageUrl";
import { Calendar } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: newsData = [], isLoading } = useGetAllNewsQuery(undefined);

  const totalPages = Math.ceil(newsData.length / ITEMS_PER_PAGE);
  const paginatedNews = newsData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <NewsLoading />;
  }
  return (
    <section className="max-w-[1200px] mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {paginatedNews.map((post) => (
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
                <span>
                  {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>

              <h3 className="font-bold text-lg text-grayNormal group-hover:text-primary transition-colors line-clamp-2 min-h-[64px]">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
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
    </section>
  );
}
