"use client";

import { useState, useEffect } from "react";

interface User {
  uid: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`);
      const data = await res.json();
      console.log(data)
      setUsers(data.users);
    };

    fetchUsers();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Người dùng gần đây</h2>
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Tên</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Điện thoại</th>
            <th className="px-4 py-2">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 10).map((user) => (
            <tr key={user.uid} className="border-t">
              <td className="px-4 py-2">{user.name || "Không có"}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.phone || "Không có"}</td>
              <td className="px-4 py-2">
                {new Date(user.createdAt).toLocaleDateString("vi-VN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
