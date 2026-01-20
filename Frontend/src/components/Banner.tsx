"use client";
import Image from "next/image";

// import { FaAngleRight } from "react-icons/fa6";
import Carousel from "react-multi-carousel";

import banner1 from "#/assets/images/banner1_hd.jpeg";
import banner3 from "#/assets/images/banner3.jpg";
import banner4 from "#/assets/images/banner4.webp";
import Link from "next/link";

// const tabbarMenu = [
//   {
//     href: "/",
//     title: "Womens  Fashion",
//     icon: <FaAngleRight />,
//   },
//   {
//     href: "/",
//     title: "Men Fashion",
//     icon: <FaAngleRight />,
//   },
//   {
//     href: "/",
//     title: "Electronics",
//   },
//   {
//     href: "/",
//     title: "Home & Lifestyle",
//     icon: <FaAngleRight />,
//   },
//   {
//     href: "/",
//     title: "Medicine",
//   },
//   {
//     href: "/",
//     title: "Sprots & Outdoor",
//     icon: <FaAngleRight />,
//   },
//   {
//     href: "/",
//     title: "Baby & Toys",
//   },
//   {
//     href: "/",
//     title: "Groceries & Pets",
//     icon: <FaAngleRight />,
//   },
//   {
//     href: "/",
//     title: "Health & Beauty",
//   },
// ];
const allBanner = [
  {
    id: 1,
    src: banner1,
    link: "/",
  },
  {
    id: 2,
    src: banner3,
    link: "/",
  },
  {
    id: 3,
    src: banner4,
    link: "/",
  },
];

export default function Banner() {
  return (
    <section className="w-full lg:flex mb-20 ">
      {/* <div className="lg:w-3/12 hidden lg:block   max-h-[500px] py-[30px] pr-[12px] border-r-2 border-[#dbdbdb]">
        <ul>
          {tabbarMenu.map((item, index: number) => (
            <li className="w-full h-full flex items-center" key={index}>
              <Link
                href={item.href}
                className="block w-full h-full py-2 text-md font-semibold hover:text-[#e34646]"
              >
                {item.title}
              </Link>
              {item.icon ? <span>{item.icon}</span> : null}
            </li>
          ))}
        </ul>
      </div> */}

      <div className="w-full lg:pt-1 ">
        <Carousel
          autoPlay
          arrows={false}
          additionalTransfrom={0}
          autoPlaySpeed={2000}
          centerMode={false}
          containerClass="container"
          draggable
          infinite
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
          }}
          rewind
          showDots
          slidesToSlide={1}
          swipeable
        >
          {allBanner.map((imgUrl) => (
            <Link
              href={imgUrl.link}
              key={imgUrl.id}
              className="block relative w-full h-[280px] lg:h-[60vh] rounded-lg overflow-hidden shadow-md"
            >
              <Image
                src={imgUrl?.src}
                alt={`banner-${imgUrl.id}`}
                fill
                className="object-cover rounded-xl"
                priority={imgUrl.id === 1}
              />
            </Link>
          ))}
        </Carousel>
      </div>
      {/* mobile tab */}
      {/* <div className="mt-4 snap-x">
        <div className="lg:hidden w-full overflow-x-auto whitespace-nowrap px-2 py-3">
          <div className="flex space-x-3">
            {tabbarMenu.map((item, index: number) => (
              <Link
                key={index}
                href={item.href}
                className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-md hover:bg-red-500 hover:text-white transition whitespace-nowrap active:bg-[#e34646]"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
}
