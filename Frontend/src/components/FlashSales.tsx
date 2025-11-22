"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import { FaStar } from "react-icons/fa";
import { CustomLeftArrow, CustomRightArrow } from "./Button";
import { useGetAllProductQuery } from "#/redux/features/productApi";
import { BsArrowRight } from "react-icons/bs";

interface CountDownTimeProps {
  targetDate: string;
}

export default function FlashSales({ targetDate }: CountDownTimeProps) {
  const {
    data: products = [],
    isLoading,
    error,
  } = useGetAllProductQuery(undefined);

  const handleCalcTimeLeft = useCallback(() => {
    const timeDiff = +new Date(targetDate) - +new Date();
    if (timeDiff <= 0) return null;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    return { days, hours, minutes, seconds };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(handleCalcTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(handleCalcTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [handleCalcTimeLeft]);

  if (isLoading) return <h1>Loading...!</h1>;
  if (error) return <h1>Lỗi !</h1>;

  return (
    <section className="w-full border-b-1 border-[#b3b3b3]">
      <div className="flex items-center justify-between mb-8 gap-4">
        <h1 className="w-full lg:w-2/6 text-3xl font-bold text-primary py-4">Flash Sales</h1>
        <Link
          href="/products"
          className="w-full lg:w-1/6 font-semibold text-red-600 hover:text-red-800 transition-colors flex items-center justify-end gap-1"
        >
          Xem tất cả
          <BsArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="w-full h-full flex items-center lg:justify-normal justify-center gap-6 text-xl">
          <h1>
            Ngày:
            <span className="text-md text-primary font-bold italic">
              {timeLeft?.days || "00"}
            </span>
          </h1>
          <h1>
            Giờ:
            <span className="text-md text-primary font-bold italic">
              {timeLeft?.hours || "00"}
            </span>
          </h1>
          <h1>
            Phút:
            <span className="text-md text-primary font-bold italic">
              {timeLeft?.minutes || "00"}
            </span>
          </h1>
          <h1>
            Giây:
            <span className="text-md text-primary font-bold italic">
              {timeLeft?.seconds || "00"}
            </span>
          </h1>
        </div>
      <div className="w-full py-10">
        {timeLeft ? (
          <Carousel
            autoPlay
            infinite
            autoPlaySpeed={3000}
            arrows
            containerClass="carousel-container"
            responsive={{
              desktop: { breakpoint: { max: 3000, min: 1200 }, items: 5 },
              tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
              mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
            }}
            itemClass="px-2"
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {products.map((product) => (
              <article
                key={product._id}
                className="relative w-full rounded-xl shadow-lg bg-white overflow-hidden transition-all duration-300 hover:shadow-2xl group"
              >
                <Link
                  href={`/products/${product._id}`}
                  className="absolute inset-0 z-20"
                />

                <div className="relative w-full h-[200px] flex items-center justify-center overflow-hidden">
                  <Image
                    src={`/${product.img}` || "/not_found.png"}
                    alt={product.title || "sản phẩm"}
                    fill
                    className="object-contain"
                  />
                </div>

                {product.oldPrice &&
                  product.oldPrice > (product.newPrice ?? 0) && (
                    <span className="absolute top-3 left-3 px-3 py-[3px] bg-[#e34646] text-white rounded-md text-sm font-semibold shadow">
                      -
                      {Math.round(
                        ((product.oldPrice - (product.newPrice ?? 0)) /
                          product.oldPrice) *
                          100
                      )}
                      %
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
                        color={
                          i < (product.countStar ?? 0) ? "#ffad33" : "#d1d1d1"
                        }
                      />
                    ))}
                    <span className="ml-3 text-sm text-black/60 font-medium">
                      ({product.totalBuy})
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </Carousel>
        ) : (
          <div className="w-full h-[400px] px-28">
            <h1 className="text-8xl text-primary font-semibold leading-[120px]">
              {":("}
            </h1>
            <p className="text-black/70 py-4 font-semibold">
              Hết Flash sale mất rồi, Hẹn gặp bạn ở dịp khác.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
