import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export interface Product {
  _id: string;
  title: string;
  gallery?: string[];
  newPrice: number;
  oldPrice: number;
  countStar: number;
  totalBuy: number;
  category: string;
  description: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductCardProps {
  product: Product;
}

const STARS = [1, 2, 3, 4, 5];

function ProductCard({ product }: ProductCardProps) {
  const discountPercentage =
    product.oldPrice > 0 && product.oldPrice > (product.newPrice || 0)
      ? Math.round(
          ((product.oldPrice - (product.newPrice || 0)) / product.oldPrice) *
            100,
        )
      : 0;

  const imageUrl = product.gallery?.length
    ? `/${product.gallery[0]}`
    : "/not_found.png";

  return (
    <article className="relative w-full rounded-xl shadow-sm border border-gray-100 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col h-full">
      <Link
        href={`/products/${product._id}`}
        className="absolute inset-0 z-20"
        aria-label={`Xem chi tiết sản phẩm ${product.title}`}
      />

      <div className="relative w-full h-[190px] bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
        <Image
          src={imageUrl}
          alt={product.title || "Sản phẩm"}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {discountPercentage > 0 && (
        <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white rounded text-xs font-bold shadow-sm z-10">
          -{discountPercentage}%
        </span>
      )}

      <div className="px-4 pb-4 pt-3 flex flex-col flex-grow">
        <p
          className="text-sm md:text-base line-clamp-2 text-gray-800"
          title={product.title}
        >
          {product.title}
        </p>

        <div className="mt-auto pt-3">
          <div className="flex items-center gap-1">
            {STARS.map((star) => (
              <FaStar
                key={star}
                size={13}
                className={
                  star <= (product.countStar || 0)
                    ? "text-yellow-400"
                    : "text-gray-200"
                }
              />
            ))}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-end gap-2">
              <p className="text-lg font-bold text-red-500 leading-none">
                ${product.newPrice?.toLocaleString()}
              </p>
              {product.oldPrice > (product.newPrice || 0) && (
                <p className="text-sm font-medium text-gray-400 line-through leading-none pb-[2px]">
                  ${product.oldPrice?.toLocaleString()}
                </p>
              )}
            </div>

            <span className="text-xs text-gray-500 font-medium">
              Đã bán {product.totalBuy || 0}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
