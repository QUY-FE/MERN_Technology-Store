"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

import banner1 from "#/assets/images/banner1_hd.jpeg";
import banner3 from "#/assets/images/banner3.jpg";
import banner4 from "#/assets/images/banner4.webp";
import BannerLoading from "./BannerLoading";

export default function Banner() {
  const [loading, setLoading] = useState(true);

  const allBanner = useMemo(() => [
    { id: 1, src: banner1, link: "/" },
    { id: 2, src: banner3, link: "/" },
    { id: 3, src: banner4, link: "/" },
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <BannerLoading />;
  }

  return (
    <section className="w-full lg:flex mb-20">
      <div className="w-full lg:pt-1">
        <Carousel
          autoPlay
          arrows={false}
          autoPlaySpeed={2000}
          infinite
          showDots
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
          }}
        >
          {allBanner.map((imgUrl) => (
            <Link
              href={imgUrl.link}
              key={imgUrl.id}
              className="block relative w-full h-[280px] lg:h-[60vh] rounded-lg overflow-hidden"
            >
              <Image
                src={imgUrl.src}
                alt={`banner-${imgUrl.id}`}
                fill
                className="object-cover"
                priority={imgUrl.id === 1}
              />
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
