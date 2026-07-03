"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "react-toastify";
// Giả định bạn đã tạo file newsApi tương tự productApi
import { useGetAllNewsQuery, useDeletedNewsMutation } from "#/redux/features/newsApi";
import getImageUrl from "#/utils/getImageUrl";

export default function AdminNewsPage() {
  const { data: newsList = [], isLoading, refetch } = useGetAllNewsQuery(undefined);
  const [deleteNews] = useDeletedNewsMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      try {
        await deleteNews(id).unwrap();
        toast.success("Xóa bài viết thành công");
        refetch();
      } catch (error) {
        toast.error("Lỗi khi xóa bài viết");
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 animate-pulse">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Tin tức</h1>
        <Link href="/admin/news/create" className="cst_btn-primary flex items-center gap-2">
          <Plus size={18} /> Thêm bài viết mới
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="px-6 py-4">Bài viết</th>
                <th className="px-6 py-4">Tác giả</th>
                <th className="px-6 py-4">Lượt xem</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {newsList.map((news: any) => (
                <tr key={news._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="relative w-16 h-12 rounded overflow-hidden border border-gray-200">
                      <Image
                        src={getImageUrl(news.thumbnail)}
                        alt={news.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 line-clamp-1 max-w-xs">{news.title}</p>
                      <p className="text-xs text-gray-400 mt-1">/{news.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{news.author}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Eye size={14} /> {news.views}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        news.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {news.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/admin/news/edit/${news._id}`}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Sửa"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(news._id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}