"use client";
import { useState } from "react";

import { useAuth } from "#/context/authContext";
import { useAppDispatch } from "#/hooks/redux.hook";
import { addToCart } from "#/redux/features/cartSlice";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import {
  useGetAllProductQuery,
  useGetOneProductQuery,
} from "#/redux/features/productApi";
import ReviewProduct from "../components/ReviewProduct";
import ViewProduct from "../components/ViewProduct";
import Error from "#/components/Error";
import ProductCard from "#/components/ProductCard";




export default function Product() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: product,isLoading , isError } = useGetOneProductQuery(id);
  const { data: products = [] } = useGetAllProductQuery(undefined);
  const { user } = useAuth();
  const router = useRouter();
  
  // <-- added quantity state & handlers
  const [quantity, setQuantity] = useState<number>(1);
  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  // <-- end added

  if (isLoading) return <h1 className="h-screen text-center text-3xl py-20">Loading...!</h1>;
  if (isError || !product) return <h1 className="h-screen text-center text-3xl py-20"><Error /></h1>;

  const related = products.filter(
  (p) => p.category === product.category && p._id !== product._id
);

const anotherProducts = products.filter(
  (p) => p._id !== product._id && p.category !== product.category
);


  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.title,
        price: product.newPrice,
        quantity,
        image: product.gallery?.[0] ?? "/defauft.jpg",
      })
    );
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  const handleBuyProduct = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    dispatch(
      addToCart({
        id: product._id,
        name: product.title,
        price: product.newPrice,
        quantity,
        image: product.gallery?.[0] ?? "/defauft.jpg",
      })
    );
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
    router.push("/products/checkout");
  };

  return (
    <section className="max-w-[1200px] mx-auto pb-10 ">
      {/* Thông tin sản phẩm */}
      <ViewProduct 
      product={product} 
      quantity={quantity} 
      increase={increase} 
      decrease={decrease} 
      handleAddToCart={handleAddToCart} 
      handleBuyProduct={handleBuyProduct}
      productId={product._id}
      />
      {/* Phần đánh giá */}
      <ReviewProduct productId={product._id} />

      
      {/* Phần đề xuất sản phẩm cùng loại */}
      <div className="mt-12 px-2">
        <h3 className="font-bold text-lg mb-4 text-red-500 flex items-center gap-2">
          <span className="w-2 h-6 bg-red-500 rounded mr-2"></span>
          Sản phẩm liên quan
        </h3>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {related.slice(0, 20).map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
      {/* Phần đề xuất sản phẩm khác */}
      <div className="mt-12 px-2">
        <h3 className="font-bold text-lg mb-4 text-red-500 flex items-center gap-2">
          <span className="w-2 h-6 bg-red-500 rounded mr-2"></span>
          Sản phẩm khác
        </h3>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {anotherProducts.slice(0, 20).map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
