"use client";

import useDebounce from "#/hooks/useDebounce";
import { useGetAllOrdersQuery } from "#/redux/features/ordersApi";
import { useGetAllProductQuery } from "#/redux/features/productApi";
import {  useEffect, useMemo, useState } from "react";
import { TiDelete } from "react-icons/ti";

export default function AdminPage() {
  const { data: products = [] } = useGetAllProductQuery(undefined);
  const { data: orders = []} = useGetAllOrdersQuery();
  const [totalUsers, setTotalUsers] = useState(0);

  const [keyword, setKeyword] = useState("");
  const debounceQuery = useDebounce(keyword, 700);
  const handleDeleteInput = (field: string) => {
    if (field === "keyword") setKeyword("");
  };
  const filteredProducts = useMemo(() => {
    const query = debounceQuery.trim().toLowerCase();
    if (query === "") return products;

    return products.filter((product) =>
      product?.title?.toLowerCase().includes(query)
    );
  }, [debounceQuery, products]);

  useEffect(() => {
  const fetchUsers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`);
    const data = await res.json();

    setTotalUsers(data.total);
  };

  fetchUsers();
}, []);



  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bảng điều khiển</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="bg-white shadow rounded p-5">
          <p className="text-gray-500">Tổng sản phẩm</p>
          <h2 className="text-2xl font-bold">{products.length}</h2>
        </div>

        <div className="bg-white shadow rounded p-5">
          <p className="text-gray-500">Đơn hàng</p>
          <h2 className="text-2xl font-bold">{orders.length}</h2>
        </div>

        <div className="bg-white shadow rounded p-5">
          <p className="text-gray-500">Người dùng</p>
          <h2 className="text-2xl font-bold">{totalUsers}</h2>
        </div>
      </div>

      <div className="w-full relative bg-[#f5f5f5] hidden rounded-lg lg:flex items-center px-2 py-1 my-4 group transition-all duration-200">
        <input
          type="text"
          value={keyword}
          name="keyword"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm sản phẩm"
          className="w-full h-[38px] px-2 outline-none bg-[#f5f5f5]"
        />
        {keyword.length > 0 ? (
          <p
            onClick={() => handleDeleteInput("keyword")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 cursor-pointer"
          >
            <TiDelete size={26} />
          </p>
        ) : (
          <p className="w-10 h-10"></p>
        )}
      </div>
      <div className="mt-10 ">
        <h2 className="text-xl font-semibold mb-4">Sản phẩm gần đây</h2>
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2">Giá</th>
              <th className="px-4 py-2">Tồn kho</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.slice(0, 10).map((p) => (
              <tr key={p._id} className="border-t">
                <td className="px-4 py-2">{p?.title}</td>
                <td className="px-4 py-2">${p?.newPrice}</td>
                <td className="px-4 py-2 text-center">
                  {p?.quantity || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
