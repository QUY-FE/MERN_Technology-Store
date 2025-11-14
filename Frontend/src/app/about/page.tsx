"use client";
import Carousel from "react-multi-carousel";

import meetingImg from "#/assets/images/meeting.jpg";
import womenAvatar from "#/assets/images/women_avatar.png";
import menAvatar from "#/assets/images/men_avatar.jpg";

import { FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { CiTwitter } from "react-icons/ci";

import Image from "next/image";

import { CustomLeftArrow, CustomRightArrow } from "#/components/Button";


const staffList = [
  
  {
    url: menAvatar.src,
    name: "Nguyễn Bỉnh Quý",
    position: "Nhân viên phòng kỹ thuật",
    socialNetwork: {
      fbUrl: "https://www.facebook.com/",
      tiktokUrl: "https://www.tiktok.com/",
      igUrl: "https://www.instagram.com/",
      xUrl: "https://x.com/",
    },
  },
];

export default function About() {
  return (
    <section className="max-w-[1200px] mx-auto">
      {/* Intro section */}
      <div className="mt-20 max-h-[600px] flex">
        <div className="w-1/2 max-h-[330px] pr-12">
          <h1 className="text-4xl font-semibold mb-4">
            Câu truyện về chúng tôi
          </h1>
          <p className="leading-8 text-black/80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, nihil harum. Tempora itaque distinctio dicta rerum
            commodi, pariatur officiis laudantium expedita nemo corrupti,
            excepturi consequatur accusantium nostrum, debitis quia ullam.
          </p>
        </div>
        <div className="w-1/2 max-h-[330px] relative">
          <Image
            src={meetingImg}
            alt="ảnh minh hoạ"
            className="rounded-2xl shadow object-cover"
          />
          <div className="absolute rounded-2xl inset-0 w-full h-full bg-black/40"></div>
        </div>
      </div>

      {/* Staff carousel */}
      <div className="mt-10">
        <h1 className="text-3xl font-bold">Các thành viên</h1>
      </div>
      <div className="w-full h-[600px] mt-20 relative">
        <Carousel
          arrows
          additionalTransfrom={0}
          centerMode={false}
          containerClass="carousel-container"
          draggable
          infinite
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1200 }, items: 3 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
          }}
          rewind
          slidesToSlide={1}
          swipeable
          itemClass="px-4"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {staffList.map((item, index) => (
            <article
              className="max-w-sm h-[460px] mx-auto my-4 text-center bg-white shadow-lg rounded-xl"
              key={index}
            >
              <Image
                src={item.url}
                alt={`avatar của ${item.name}`}
                width={300}
                height={350}
                className="mx-auto rounded-full object-cover py-6"
              />
              <h1 className="text-2xl font-semibold leading-[35px]">
                {item.name}
              </h1>
              <p className="text-sm text-black/70 leading-[35px]">
                {item.position}
              </p>
              <ul className="flex items-center justify-center gap-3 text-black/80 leading-[35px]">
                <li>
                  <a
                    href={item?.socialNetwork?.tiktokUrl}
                    target="_blank"
                    className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-black/10 hover:scale-105  "
                  >
                    <AiFillTikTok size={30} />
                  </a>
                </li>
                <li>
                  <a
                    href={item?.socialNetwork?.igUrl}
                    target="_blank"
                    className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-black/10 hover:scale-105  "
                  >
                    <FaInstagram size={30} />
                  </a>
                </li>
                <li>
                  <a
                    href={item?.socialNetwork?.fbUrl}
                    target="_blank"
                    className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-black/10 hover:scale-105  "
                  >
                    <FaFacebookSquare size={30} />
                  </a>
                </li>
                <li>
                  <a
                    href={item?.socialNetwork?.xUrl}
                    target="_blank"
                    className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-black/10 hover:scale-105  "
                  >
                    <CiTwitter size={30} />
                  </a>
                </li>
              </ul>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
