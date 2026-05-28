"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import banner1 from "#/assets/images/banner1_hd.jpeg";
import banner3 from "#/assets/images/banner3.jpg";
import banner4 from "#/assets/images/banner4.webp";
import Link from "next/link";

const banners = [
  { id: 1, src: banner1, link: "/" },
  { id: 2, src: banner3, link: "/" },
  { id: 3, src: banner4, link: "/" },
];

const paginationConfig = {
  dynamicBullets: true,
};

export default function Banner() {
  

  return (
    <section className="w-full lg:flex my-2 lg:mt-4  lg:mb-8">
      <div className="w-full lg:pt-1 px-1 lg:px-0">
        <Swiper
          pagination={paginationConfig}
          modules={[Pagination, Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {banners.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative block w-full h-[280px] lg:h-[50vh]  rounded-[32px] overflow-hidden">
                <Link href={item.link}>
                  <Image
                    src={item.src}
                    alt={`banner-${item.id}`}
                    fill
                    className="object-cover"
                    priority={item.id === 1}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
