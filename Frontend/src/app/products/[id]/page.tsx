"use client";
import { useState, useMemo, useCallback } from "react";
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
import ProductDetailLoading from "./ProductDetailLoading";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const [quantity, setQuantity] = useState<number>(1);

  const { data: product, isLoading, isError } = useGetOneProductQuery(id);
  const { data: products = [] } = useGetAllProductQuery(undefined, {
    skip: !product,
  });

  const increase = useCallback(() => setQuantity((q) => q + 1), []);
  const decrease = useCallback(() => setQuantity((q) => (q > 1 ? q - 1 : 1)), []);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product._id,
        name: product.title,
        price: product.newPrice,
        quantity,
        image: product.gallery?.[0] ?? "/default.jpg",
      })
    );
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
  }, [dispatch, product, quantity]);

  const handleBuyProduct = useCallback(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    handleAddToCart();
    router.push("/products/checkout");
  }, [user, router, handleAddToCart]);

  const { related, anotherProducts } = useMemo(() => {
    if (!product || !products.length) return { related: [], anotherProducts: [] };

    const rel = [];
    const anoth = [];

    for (const p of products) {
      if (p._id === product._id) continue;
      
      if (p.category === product.category) {
        if (rel.length < 20) rel.push(p);
      } else {
        if (anoth.length < 20) anoth.push(p);
      }

      if (rel.length === 20 && anoth.length === 20) break;
    }

    return { related: rel, anotherProducts: anoth };
  }, [products, product]);

  if (isLoading) return <ProductDetailLoading />;
  if (isError || !product) {
    return (
      <h1 className="h-screen text-center text-3xl py-20">
        <Error />
      </h1>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto pb-10">
      <ViewProduct
        product={product}
        quantity={quantity}
        increase={increase}
        decrease={decrease}
        handleAddToCart={handleAddToCart}
        handleBuyProduct={handleBuyProduct}
        productId={product._id}
      />
      
      <ReviewProduct productId={product._id} />

      <div className="mt-12 px-2">
        <h3 className="font-bold text-lg mb-4 text-red-500 flex items-center gap-2">
          <span className="w-2 h-6 bg-red-500 rounded mr-2"></span>
          Sản phẩm liên quan
        </h3>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {related.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>

      <div className="mt-12 px-2">
        <h3 className="font-bold text-lg mb-4 text-red-500 flex items-center gap-2">
          <span className="w-2 h-6 bg-red-500 rounded mr-2"></span>
          Sản phẩm khác
        </h3>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {anotherProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}