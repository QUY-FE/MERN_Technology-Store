"use client";

import { useGetAllOrdersQuery } from "#/redux/features/ordersApi";
import { useGetAllProductQuery } from "#/redux/features/productApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBox } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { IoTrendingUpSharp } from "react-icons/io5";

export default function AdminPage() {
  const { data: products = [] } = useGetAllProductQuery(undefined);
  const { data: orders = [] } = useGetAllOrdersQuery();
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`);
      const data = await res.json();

      setTotalUsers(data.total);
    };

    fetchUsers();
  }, []);

  const menuDashboard = [
    {
      title: "Tổng sản phẩm",
      href: "/admin/products",
      icon: <BsBox size={24} />,
      value: products.length.toString(),
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Tổng đơn hàng",
      href: "/admin/orders",
      icon: <IoTrendingUpSharp size={24} />,
      value: orders.length.toString(),
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Tổng Khách hàng",
      href: "/admin/users",
      icon: <FaUserGroup size={24} />,
      value: totalUsers.toString(),
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl">
          <strong>Bảng điều khiển</strong>
        </h1>
        <p>Tổng quan về hoạt động của hệ thống.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {menuDashboard.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
          >
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {item.title}
              </p>
              <h3 className="text-3xl font-bold text-gray-900">{item.value}</h3>
            </div>
            <div
              className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
            >
              {item.icon}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
