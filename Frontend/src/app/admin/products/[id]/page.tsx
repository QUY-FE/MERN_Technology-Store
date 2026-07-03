"use client";

import { useGetAllProductQuery } from "#/redux/features/productApi";
import { ChevronLeft, Star, Package, ShoppingCart, Tag, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import getImageUrl from "#/utils/getImageUrl";

const Page = () => {
  const { id } = useParams();
  const { data: products = [], isLoading } = useGetAllProductQuery();
  const product = products.find((p) => p._id === id);

  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    if (product && Array.isArray(product.gallery) && product.gallery.length > 0) {
      setMainImage(product.gallery[0]);
    }
  }, [product]);

  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 animate-pulse font-medium">Đang tải dữ liệu sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Package size={48} className="text-gray-300 mb-4" />
        <p className="text-lg text-gray-600 font-medium">Sản phẩm không tồn tại hoặc đã bị xóa.</p>
        <Link href={"/admin/products"} className="mt-4 text-primary hover:underline text-sm">
          Quay lại danh sách
        </Link>
      </div>
    );
  }


  return (
    <div className="max-w-6xl mx-auto p-2 md:p-6 bg-gray-50/50 min-h-screen">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Xem trước sản phẩm</h1>
          <p className="text-sm text-gray-500 mt-1">Giao diện giả lập phía người dùng (Client View)</p>
        </div>
        <Link
          href={"/admin/products"}
          className="cst_btn-icon"
        >
          <ChevronLeft size={18} />
          Quay lại
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-5/12 flex flex-col gap-4">
            <div className="relative w-full aspect-square rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
              {mainImage ? (
                <Image
                  src={getImageUrl(mainImage)}
                  alt={product.title}
                  fill
                  className="object-contain p-2 transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <Package size={48} className="mb-2 opacity-50" />
                  <span className="text-sm">Chưa có hình ảnh</span>
                </div>
              )}
            </div>

            {Array.isArray(product.gallery) && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all ${
                      mainImage === img ? "border-primary shadow-md" : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={getImageUrl(img)} alt={`Thumbnail ${index}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full lg:w-7/12 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1">
                <Tag size={12} />
                {product.category}
              </span>
              <span className="text-xs text-gray-400 font-mono">ID: {product._id}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {product.title}
            </h2>

            <div className="flex items-center gap-4 mb-6 text-sm">
              
              <div className="text-gray-600">
                Đã bán: <span className="font-semibold text-gray-900">{product.totalBuy || 0}</span>
              </div>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-5 mb-6 border border-gray-100">
              <div className="flex items-end gap-3 flex-wrap">
                <span className="text-3xl font-bold text-red-600">{product.price}$</span>
                
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-24 text-gray-500">Tình trạng:</span>
                {product.quantity > 0 ? (
                  <span className="flex items-center gap-1.5 font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    <CheckCircle2 size={16} /> Còn hàng ({product.quantity} sản phẩm)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-medium text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                    <XCircle size={16} /> Hết hàng
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4 mb-10 opacity-70 pointer-events-none">
              <button className="cst_btn-secondary-icon">
                <ShoppingCart size={20} />
                Thêm vào giỏ hàng
              </button>
              <button className="cst_btn-primary">
                Mua ngay
              </button>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Đặc điểm nổi bật</h3>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                {product.description || "Chưa có mô tả cho sản phẩm này."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;