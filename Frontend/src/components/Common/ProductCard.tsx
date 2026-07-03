import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import getImageUrl from "#/utils/getImageUrl";
import { Tag } from "lucide-react";

export interface Product {
  _id: string;
  title: string;
  gallery?: string[];
  price: number;
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

function ProductCard({ product }: ProductCardProps) {
  const handerRenderMainImage = product.gallery?.length
    ? getImageUrl(product.gallery[0])
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
          src={handerRenderMainImage}
          alt={product.title || "Sản phẩm"}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <span className="flex items-center gap-1 absolute top-1.5 right-2 px-2 py-1 bg-blue-100 text-blue-500 font-medium rounded-full text-xs  shadow-sm z-10">
        <Tag size={12} />
        {product?.category}
      </span>
      <div className="px-4 pb-4 pt-3 flex flex-col flex-grow">
        <p
          className="text-sm md:text-base line-clamp-2 text-gray-800"
          title={product.title}
        >
          {product.title}
        </p>

        <div className="mt-auto pt-3">
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-end gap-2">
              <p className="text-lg font-bold text-red-600 leading-none">
                ${product.price?.toLocaleString()}
              </p>
            </div>
            <span className="text-xs text-gray-400">
              Đã bán {product.totalBuy || 0}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
