"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import {
  Trash2,
  Edit,
  Phone,
  User,
  Clock,
  MessageSquare,
  Activity,
} from "lucide-react";
import {
  useGetAllContactsQuery,
  useDeleteContactMutation,
} from "#/redux/features/contactApi";

export default function AdminContactsPage() {
  const { data: contacts = [], isLoading, refetch } = useGetAllContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lượt liên hệ này không?")) {
      try {
        await deleteContact(id).unwrap();
        toast.success("Xóa liên hệ thành công");
        refetch();
      } catch (error) {
        console.error(error);
        toast.error("Xóa liên hệ thất bại");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Đang tải danh sách liên hệ...
      </div>
    );
  }

  // Hàm tiện ích tạo màu badge cho từng trạng thái
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Hoàn thành":
        return "bg-green-100 text-green-700";
      case "Đã hủy":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700"; // Đang xử lý
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="px-6 py-4 flex items-center gap-2">
                  <User size={16} /> Khách hàng
                </th>
                <th className="px-6 py-4">
                  <span className="flex items-center gap-2">
                    <Phone size={16} /> Số điện thoại
                  </span>
                </th>
                <th className="px-6 py-4">
                  <span className="flex items-center gap-2">
                    <MessageSquare size={16} /> Nội dung
                  </span>
                </th>
                <th className="px-6 py-4">
                  <span className="flex items-center gap-2">
                    <Activity size={16} /> Trạng thái
                  </span>
                </th>
                <th className="px-6 py-4">
                  <span className="flex items-center gap-2">
                    <Clock size={16} /> Ngày gửi
                  </span>
                </th>
                <th className="px-6 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.length > 0 ? (
                contacts.map((contact: any) => (
                  <tr
                    key={contact._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {contact.username}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {contact.number}
                    </td>
                    <td className="px-6 py-4 max-w-xs md:max-w-[200px]">
                      <p className="line-clamp-2 text-gray-600 leading-relaxed text-xs">
                        {contact.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusBadge(
                          contact.status || "Đang xử lý",
                        )}`}
                      >
                        {contact.status || "Đang xử lý"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <Link
                          href={`/admin/contacts/edit/${contact._id}`}
                          className="text-blue-500 hover:text-blue-700 transition"
                          title="Xử lý"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(contact._id)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-400 italic"
                  >
                    Chưa có dữ liệu liên hệ nào từ khách hàng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
