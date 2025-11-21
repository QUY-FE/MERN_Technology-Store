"use client";
import { useGetAllProductQuery } from "#/redux/features/productApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();
  const { data: products = []} = useGetAllProductQuery();
  const product = products.find((p) => p._id === id);

  if (!product) {
    return <p className="text-center mt-10">Sản phẩm không tồn tại</p>;
  }

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Chi tiết sản phẩm</h1>
      
      <ul className="border rounded-lg divide-y">
        <li className="flex justify-between p-3">
          <span className="font-semibold">ID:</span>
          <span>{product._id}</span>
        </li>
        <li className="flex justify-between p-3">
          <span className="font-semibold">Title:</span>
          <span>{product.title}</span>
        </li>
        <li className="flex justify-between p-3">
          <span className="font-semibold">URL:</span>
          <span>{product.img || "Không có"}</span>
        </li>
        <li className="flex justify-between p-3">
          <span className="font-semibold">Giá mới:</span>
          <span>${product.newPrice}</span>
        </li>
        <li className="flex justify-between p-3">
          <span className="font-semibold">Giá cũ:</span>
          <span>{product.oldPrice ? `$${product.oldPrice}` : "Không có"}</span>
        </li>
        <li className="flex justify-between p-3">
          <span className="font-semibold">Sao:</span>
          <span>{product.countStar}</span>
        </li>
        <li className="flex justify-between p-3">
          <span className="font-semibold">Tổng số mua:</span>
          <span>{product.totalBuy} đơn</span>
        </li>
        <li className="flex justify-between p-3">
          <span className="font-semibold">Số lượng :</span>
          <span>{product.quantity} sản phẩm</span>
        </li>
        <li className="flex justify-between p-3">
          <span className="font-semibold">Danh mục:</span>
          <span>{product.category}</span>
        </li>
        <li className="flex justify-between p-3">
          <span className="font-semibold">Mô tả:</span>
          <span>{product.description}</span>
        </li>
      </ul>
      <div className="mt-4">
        <Link href={"/admin/products"} className="cst_btn px-4 py-2">Quay lại</Link>
      </div>
    </div>
  );
};

export default Page;
