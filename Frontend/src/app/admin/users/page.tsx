"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { FaCaretLeft, FaCaretRight, FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import SearchInput from "#/components/Common/SearchInput";
import useDebounce from "#/hooks/useDebounce";
import ReactPaginate from "react-paginate";

interface User {
  uid: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [keyword, setKeyword] = useState("");
  const debounceQuery = useDebounce(keyword, 700);
  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`);
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [debounceQuery]);

  const filteredUsers = useMemo(() => {
    const query = debounceQuery.trim().toLowerCase();
    if (query === "") return users;
    return users.filter(
      (user) =>
        user?.name?.toLowerCase().includes(query) ||
        user?.email?.toLowerCase().includes(query)
    );
  }, [debounceQuery, users]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
  const paginatedUsers = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return filteredUsers.slice(offset, offset + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Người dùng gần nhất</h2>
        <div className="w-full md:w-1/3">
          <SearchInput
            value={keyword}
            onChange={setKeyword}
            placeholder="Tìm theo tên hoặc email..."
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Họ & tên</th>
              <th className="px-6 py-4">Liên hệ</th>
              <th className="px-6 py-4">Ngày tạo tài khoản</th>
              <th className="px-6 py-4 text-center">Trạng thái</th>
              <th className="px-6 py-4 text-center">Tác động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          fill
                          className="rounded-full object-cover"
                          sizes="40px"
                        />
                      </div>
                      <span className="font-medium text-gray-900">{user.name || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex flex-col gap-1 text-gray-600">
                      <p>
                        Email: <span className="font-medium text-gray-900">{user.email}</span>
                      </p>
                      <p>
                        Điện thoại:{" "}
                        <span className="font-medium text-gray-900">
                          {user.phone || "N/A"}
                        </span>
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      Hoạt động
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/users/${user.uid}`}
                        className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200 transition-colors"
                        title="Xem chi tiết"
                      >
                        <FaRegEye size={18} />
                      </Link>
                      <Link
                        href={`/admin/users/edit/${user.uid}`}
                        className="bg-yellow-100 text-yellow-600 p-2 rounded-lg hover:bg-yellow-200 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <FaRegEdit size={18} />
                      </Link>
                      <button
                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                        title="Xóa"
                      >
                        <MdDeleteOutline size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  Không có người dùng nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-end">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FaCaretRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={totalPages}
            previousLabel={<FaCaretLeft />}
            renderOnZeroPageCount={null}
            forcePage={currentPage}
            containerClassName="flex items-center gap-1 sm:gap-2"
            pageLinkClassName="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            previousLinkClassName="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
            nextLinkClassName="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
            activeLinkClassName="!bg-primary !text-white !border-primary"
            disabledLinkClassName="opacity-50 cursor-not-allowed hover:bg-transparent"
            breakLinkClassName="px-2 py-1 text-gray-500"
          />
        </div>
      )}
    </div>
  );
}