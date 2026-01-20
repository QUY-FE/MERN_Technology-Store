"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import { FaStar } from "react-icons/fa";
import { CustomLeftArrow, CustomRightArrow } from "./Button";
import { useGetAllProductQuery } from "#/redux/features/productApi";
import { BsArrowRight } from "react-icons/bs";
import ProductCard from "./ProductCard";

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
      {/* <div className="flex items-center justify-between mb-8 gap-4">
        <h1 className="w-full lg:w-2/6 text-3xl font-bold text-primary py-4">Flash Sales</h1>
        <Link
          href="/products"
          className="w-full lg:w-1/6 font-semibold text-red-600 hover:text-red-800 transition-colors flex items-center justify-end gap-1"
        >
          Xem tất cả
          <BsArrowRight className="w-4 h-4" />
        </Link>
      </div> */}
      <div className="flex justify-between items-end mb-8 border-b pb-4 border-gray-200">
              <div>
                  <h2 className="text-2xl text-red-600 font-bold uppercase tracking-wide">
                  Flash Sales
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Siêu sell ưu đãi </p>
              </div>
              
              <Link
                href="/products"
                className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                Xem tất cả
                <BsArrowRight className="w-4 h-4" />
              </Link>
            </div> 


      <div className="w-full h-full flex items-center lg:justify-normal justify-center gap-1 text-xl">
          <h1>
            Ngày:
            <span className="px-2 text-primary  ">
              {timeLeft?.days || "00"}
            </span>
          </h1>
          <h1>
            Giờ:
            <span className="px-2 text-primary  ">
              {timeLeft?.hours || "00"}
            </span>
          </h1>
          <h1>
            Phút:
            <span className="px-2 text-primary  ">
              {timeLeft?.minutes || "00"}
            </span>
          </h1>
          <h1>
            Giây:
            <span className="px-2 text-primary  ">
              {timeLeft?.seconds || "00"}
            </span>
          </h1>
      </div>
      {/* <div className="w-full h-[400px] py-10"> */}
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
            itemClass="mt-10 pb-20 px-[5px]" 
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Carousel>
        ) : (
          <div className="w-full h-[400px] px-28 ">
            <h1 className="text-8xl text-primary font-semibold leading-[120px]">
              {":("}
            </h1>
            <p className="text-black/70 py-4 font-semibold">
              Hết Flash sale mất rồi, Hẹn gặp bạn ở dịp khác.
            </p>
          </div>
        )}
      {/* </div> */}
    </section>
  );
}
