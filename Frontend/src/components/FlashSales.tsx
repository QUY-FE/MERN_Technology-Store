"use client";
import { useEffect, useState } from "react";
import { useProducts } from "#/context/productContext";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import { FaStar } from "react-icons/fa";
import Button, { CustomLeftArrow, CustomRightArrow } from "./Button";

interface CountDownTimeProps {
  targetDate: string;
}

export default function FlashSales({ targetDate }: CountDownTimeProps) {
  const { products, loading, error } = useProducts();
  const handleCalcTimeLeft = () => {
    const timeDiff = +new Date(targetDate) - +new Date();
    if (timeDiff <= 0) return null;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };
  const [timeLeft, setTimeLeft] = useState(handleCalcTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(handleCalcTimeLeft());
    }, 1000);
  }, []);

  if (loading) return <h1>Loading...!</h1>;
  if (error) return <h1>Lỗi: {error}</h1>;

  return (
    <section className="w-full border-b-1 border-[#b3b3b3]">
      <p className="mb-6 border-l-12 text-primary text-4xl rounded-md font-semibold">
        Todays
      </p>
      <div className="flex items-center justify-between mb-8">
        <h1 className="w-2/6 text-3xl font-semibold">Flash Sales</h1>
        <div className="w-4/6 h-full flex items-center gap-6  text-xl">
          <h1>
            Ngày :{" "}
            <span className="text-md text-primary font-bold italic">
              {timeLeft?.days || "00"}
            </span>
          </h1>
          <h1>
            Giờ:{" "}
            <span className="text-md text-primary font-bold italic">
              {timeLeft?.hours || "00"}
            </span>
          </h1>
          <h1>
            Phút:{" "}
            <span className="text-md text-primary font-bold italic">
              {timeLeft?.minutes || "00"}
            </span>
          </h1>
          <h1>
            Giây:{" "}
            <span className="text-md text-primary font-bold italic">
              {timeLeft?.seconds || "00"}
            </span>
          </h1>
        </div>
        <Link href="/products">
          <Button text="Xem thêm" primary w={156} h={46} />
        </Link>
      </div>
      <div className="w-full min-h-[400px] my-10">
        {timeLeft ? (
          <Carousel
            arrows
            additionalTransfrom={0}
            centerMode={false}
            containerClass="carousel-container"
            draggable
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            responsive={{
              desktop: { breakpoint: { max: 3000, min: 1200 }, items: 4 },
              tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
              mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
            }}
            rewind
            slidesToSlide={1}
            swipeable
            itemClass="px-2"
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {products.map((product, index) => (
              <article
                className="relative group block w-[270px] h-[330px] shadow-lg hover:-top-1 transition-all duration-300 ease-in-out"
                key={`product__${index}`}
              >
                <Link
                  href={`/products/${product?.slug}`}
                  className="absolute inset-0 hidden  group-hover:flex justify-between py-3 px-2 z-50 hover:bg-black/5"
                ></Link>
                <img
                  src={product?.image || "/keyboard.jpg"}
                  alt={product?.title}
                  className="w-full h-[200px] relative object-cover rounded-t-lg shadow-md"
                />
                <span className="absolute top-4 left-3 w-[55px] h-[27px] bg-[#e34646] text-white rounded text-md text-center font-semibold">
                  -{product?.salePercent}%
                </span>
                <div className="px-4 py-2">
                  <h1 className="w-full h-[40px] font-medium leading-[40px]">
                    {product?.title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <p className="h-[30px] text-[#e34646] text-lg font-medium leading-[30px]">
                      ${product?.newPrice}
                    </p>
                    <p className="h-[30px] leading-[30px] font-medium text-sm italic line-through text-black/60">
                      ${product?.oldPrice}
                    </p>
                  </div>
                  <div className="flex items-center h-[30px] leading-[30px]">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < product.countStar ? "#ffad33" : "gray"}
                      />
                    ))}
                    <p className="px-4 text-black/70 font-medium">
                      ({product?.totalBuy})
                    </p>
                  </div>
                </div>
            </article>
            ))}
          </Carousel>
        ) : (
          <div className="w-full h-[400px] px-28 ">
            <h1 className="text-8xl text-primary font-semibold leading-[120px] ">
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
