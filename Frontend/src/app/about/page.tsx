"use client";
import Carousel from "react-multi-carousel";

// ... (giữ nguyên các import)
import meetingImg from "#/assets/images/meeting.jpg";

import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { CiTwitter } from "react-icons/ci";
import Image from "next/image";
import { CustomLeftArrow, CustomRightArrow } from "#/components/Button";

// ... (giữ nguyên staffList)
const staffList = [
  {
    url: "/men_avatar.jpg",
    name: "Mai Nam Hải",
    position: "Nhà sáng lập",
    socialNetwork: {
      fbUrl: "https://www.facebook.com/",
      tiktokUrl: "https://www.tiktok.com/",
      igUrl: "https://www.instagram.com/",
      xUrl: "https://x.com/",
    },
  },
  {
    url: "/men_avatar.jpg",
    name: "Vũ Đức Trung",
    position: "Tổng Giám Đốc",
    socialNetwork: {
      fbUrl: "https://www.facebook.com/",
      tiktokUrl: "https://www.tiktok.com/",
      igUrl: "https://www.instagram.com/",
      xUrl: "https://x.com/",
    },
  },
  {
    url: "/women_avatar.png",
    name: "Hoàng Minh Ngân",
    position: "Trưởng Phòng",
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
    <section className="max-w-[1200px] mx-auto py-20 px-4">
      {/* Intro section */}
      {/* ========== PHẦN SLOGAN MỚI THÊM ========== */}
      <div className="my-28">
        <blockquote className="text-center">
          <p className="text-3xl italic font-medium text-gray-700">
            {'"Công nghệ trong tầm tay, Tương lai trong tầm mắt."'}
          </p>
          <footer className="mt-4 text-lg font-semibold text-gray-900">
            — Qn Shop
          </footer>
        </blockquote>
      </div>
      {/* ========================================= */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Phần text */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Câu truyện về chúng tôi
          </h1>
          <p className="text-lg leading-relaxed text-gray-600">
            Qn Shop không chỉ là một cái tên, đó là khởi đầu của một hành
            trình. Được thành lập từ niềm đam mê công nghệ cháy bỏng và mong
            muốn mang đến những sản phẩm chất lượng với mức giá phải chăng,
            chúng tôi hiểu rằng việc tìm kiếm một thiết bị ưng ý — từ chiếc
            laptop mạnh mẽ cho công việc đến những phụ kiện độc đáo — là vô
            cùng quan trọng.
            <br /> <br />
            Vì vậy, Qn Shop ra đời không chỉ là một cửa hàng, mà là một người
            bạn đồng hành công nghệ, cam kết về sự uy tín và dịch vụ tận tâm.
          </p>
        </div>

        {/* Phần ảnh */}
        <div className="w-full md:w-1/2">
          <Image
            src={meetingImg}
            alt="ảnh minh hoạ"
            className="rounded-2xl shadow-xl object-cover w-full h-full"
          />
        </div>
      </div>

      


      {/* Staff carousel */}
      {/* Tăng khoảng cách từ slogan đến phần staff */}
      <div className="mt-28">
        <h1 className="text-3xl font-bold text-center mb-16 text-gray-900">
          Các thành viên
        </h1>

        <div className="w-full relative">
          <Carousel
            // ... (giữ nguyên props của Carousel)
            arrows
            additionalTransfrom={0}
            centerMode={false}
            containerClass="carousel-container"
            draggable
            // infinite
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
              // ... (giữ nguyên code <article> đã sửa)
              <article
                className="
                  max-w-sm mx-auto my-4 text-center bg-white 
                  shadow-lg rounded-xl p-8 
                  transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
                "
                key={index}
              >
                <Image
                  src={item.url}
                  alt={`avatar của ${item.name}`}
                  width={144}
                  height={144}
                  className="mx-auto rounded-full object-cover mb-6 w-36 h-36"
                />
                
                <h1 className="text-2xl font-semibold mb-2 text-gray-800">
                  {item.name}
                </h1>
                <p className="text-base text-gray-500 mb-6">
                  {item.position}
                </p>

                <ul className="flex items-center justify-center gap-3">
                  <li>
                    <a
                      href={item?.socialNetwork?.tiktokUrl}
                      target="_blank"
                      className="
                        w-10 h-10 flex justify-center items-center rounded-full 
                        hover:bg-gray-100 hover:scale-110 
                        transition-all duration-300 text-gray-600 hover:text-black
                      "
                    >
                      <AiFillTikTok size={24} />
                    </a>
                  </li>
                  <li>
                    <a
                      href={item?.socialNetwork?.igUrl}
                      target="_blank"
                      className="
                        w-10 h-10 flex justify-center items-center rounded-full 
                        hover:bg-gray-100 hover:scale-110 
                        transition-all duration-300 text-gray-600 hover:text-pink-200
                      "
                    >
                      <FaInstagram size={24} />
                    </a>
                  </li>
                  <li>
                    <a
                      href={item?.socialNetwork?.fbUrl}
                      target="_blank"
                      className="
                        w-10 h-10 flex justify-center items-center rounded-full 
                        hover:bg-gray-100 hover:scale-110 
                        transition-all duration-300 text-gray-600 hover:text-blue-600
                      "
                    >
                      <FaFacebookSquare size={24} />
                    </a>
                  </li>
                  <li>
                    <a
                      href={item?.socialNetwork?.xUrl}
                      target="_blank"
                      className="
                        w-10 h-10 flex justify-center items-center rounded-full 
                        hover:bg-gray-100 hover:scale-110 
                        transition-all duration-300 text-gray-600 hover:text-gray-900
                      "
                    >
                      <CiTwitter size={24} />
                    </a>
                  </li>
                </ul>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}