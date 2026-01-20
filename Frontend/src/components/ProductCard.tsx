
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



export default function ProductCard({ product }: ProductCardProps) {
  // Logic tính % giảm giá tách ra cho gọn
  const discountPercentage =
    product.oldPrice && product.oldPrice > (product.newPrice ?? 0)
      ? Math.round(((product.oldPrice - (product.newPrice ?? 0)) / product.oldPrice) * 100)
      : 0;

  return (
    <article className="relative w-full rounded-xl shadow-lg bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group">
      <Link href={`/products/${product._id}`} className="absolute inset-0 z-20"></Link>
      
      <div className="relative w-full h-[190px] bg-white flex items-center justify-center overflow-hidden">
        <Image
          // src={product.img ? `/${product.img}` : "/not_found.png"}
          src={`/${product.gallery?.[0]}`}
          alt={product.title || "Sản phẩm"}
          fill
          className="object-contain p-3 transition-all duration-300 group-hover:scale-105"
        />
      </div>

      {/* Badge giảm giá */}
      {discountPercentage > 0 && (
        <span className="absolute top-3 left-3 px-3 py-[3px] bg-[#e34646] text-white rounded-md text-sm font-semibold shadow">
          -{discountPercentage}%
        </span>
      )}

      <div className="px-4 pb-4 pt-2">
        <h2 className="text-base font-medium h-[42px] line-clamp-2">
          {product.title}
        </h2>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-lg font-semibold text-[#e34646]">
            ${product.newPrice}
          </p>
          <p className="text-sm font-medium text-black/60 line-through italic">
            ${product.oldPrice}
          </p>
        </div>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              size={16}
              color={i < (product.countStar ?? 0) ? "#ffad33" : "#d1d1d1"}
            />
          ))}
          {/* <span className="ml-3 text-sm text-black/60 font-medium">
            ({product.totalBuy ?? 0})
          </span> */}
        </div>
      </div>
    </article>
  );
}