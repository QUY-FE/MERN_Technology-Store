"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { FaCaretLeft, FaCaretRight, FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import SearchInput from "#/components/SearchInput";
import useDebounce from "#/hooks/useDebounce";

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
  const [keyword, setKeyword] = useState("");
  const debounceQuery = useDebounce(keyword, 700);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`);
      const data = await res.json();
      setUsers(data.users);
    };

    fetchUsers();
  }, []);

  // Lọc sản phẩm trước, sau đó phân trang
  const filteredUsers = useMemo(() => {
    const query = debounceQuery.trim().toLowerCase();
    if (query === "") return users;
    return users.filter(
      (user) =>
        user?.name?.toLowerCase().includes(query) ||
        user?.email?.toLowerCase().includes(query),
    );
  }, [debounceQuery, users]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Người dùng gần nhất</h2>

        <SearchInput
          value={keyword}
          onChange={setKeyword}
          placeholder="Tìm sản phẩm ?"
        />
      {/* Pagination controls and add button */}
      <div className="flex justify-end gap-1 mb-4">
        <div className="flex gap-2 border border-colorBorder rounded-md">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2  hover:bg-gray-200 disabled:opacity-50"
          >
            <FaCaretLeft />
          </button>
          <span className="px-3 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 hover:bg-gray-200   disabled:opacity-50"
          >
            <FaCaretRight />
          </button>
        </div>
      </div>
      {/* Pagination controls */}

      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-100 ">
            <th className="px-4 py-2">Họ & tên</th>
            <th className="px-4 py-2">Liên hệ</th>
            <th className="px-4 py-2">Ngày tạo tài khoản</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Tác động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <tr key={user.uid} className="border-t text-gray-600">
                <td className="px-4 py-2 flex items-center justify-around gap-3">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <span>{user.name || "N/A"}</span>
                </td>
                <td className="px-4 py-2 text-left">
                  <p className="pb-1">
                    <span>Email: </span> {user.email}
                  </p>
                  <p>
                    Điện thoại:{" "}
                    <span className="font-extralight italic">
                      {user.phone || "N/A"}
                    </span>
                  </p>
                </td>
                <td className="px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-4 py-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Hoạt động
                  </span>
                </td>
                <td className="px-4 py-2 italic font-extralight">
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={""}
                      className="bg-green-100 rounded-lg text-green-600 px-3 py-2 flex items-center gap-2 hover:scale-110 transition-transform duration-300"
                    >
                      <FaRegEye size={22} />
                    </Link>
                    <Link
                      href={""}
                      className="bg-yellow-100 rounded-lg text-yellow-600 px-3 py-2 flex items-center gap-2  hover:scale-110 transition-transform duration-300"
                    >
                      <FaRegEdit size={22} />
                    </Link>
                    <button
                      // onClick={''}
                      className="bg-red-100 rounded-lg text-red-600 px-3 py-2 flex items-center gap-2 hover:scale-110 transition-transform duration-300"
                    >
                      <MdDeleteOutline size={22} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-center">
                Không có người dùng nào phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
