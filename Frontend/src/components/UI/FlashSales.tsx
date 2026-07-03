"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import { CustomLeftArrow, CustomRightArrow } from "../Button";
import { useGetAllProductQuery } from "#/redux/features/productApi";
import { BsArrowRight } from "react-icons/bs";
import ProductCard from "../Common/ProductCard";
import FlashSalesLoading from "./FlashSalesLoading";
import { ChevronRight } from "lucide-react";
import { FaFire } from "react-icons/fa";

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

  if (isLoading) return <FlashSalesLoading />;
  if (error) return <h1>Lỗi !</h1>;

  return (
    <section className="w-full border-b-1 border-[#b3b3b3]">
      <div className="block lg:flex justify-between items-end lg:px-0 px-2  pb-4 ">
          <h2 className="flex items-center gap-2 md:py-2 text-2xl text-primary font-bold uppercase tracking-wide">
            <FaFire />
            Flash Sales
          </h2>

        <Link href="/products" className="cst_btn-secondary-icon">
          Xem thêm
          <ChevronRight size={20} />
        </Link>
      </div>

      <div className="w-full h-full flex items-center lg:justify-normal justify-center gap-1 text-xl">
        <h1>
          Ngày:
          <span className="px-2 text-primary  ">{timeLeft?.days || "00"}</span>
        </h1>
        <h1>
          Giờ:
          <span className="px-2 text-primary  ">{timeLeft?.hours || "00"}</span>
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
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
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
    </section>
  );
}
