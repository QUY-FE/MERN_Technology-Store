"use client";
import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="max-w-[1200px] mx-auto py-20 px-4">
      {/* Intro section */}

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

      <div className="flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Phần text */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Câu truyện về chúng tôi
          </h1>
          <p className="text-lg leading-relaxed text-gray-600">
            Qn Shop không chỉ là một cái tên, đó là khởi đầu của một hành trình.
            Được thành lập từ niềm đam mê công nghệ cháy bỏng và mong muốn mang
            đến những sản phẩm chất lượng với mức giá phải chăng, chúng tôi hiểu
            rằng việc tìm kiếm một thiết bị ưng ý — từ chiếc laptop mạnh mẽ cho
            công việc đến những phụ kiện độc đáo — là vô cùng quan trọng.
            <br /> <br />
            Vì vậy, Qn Shop ra đời không chỉ là một cửa hàng, mà là một người
            bạn đồng hành công nghệ, cam kết về sự uy tín và dịch vụ tận tâm.
          </p>
        </div>

        {/* Phần ảnh */}
        <div className="w-full md:w-1/2">
          <Image
            width={500}
            height={400}
            src={"/meeting.jpg"}
            alt="ảnh minh hoạ"
            className="rounded-2xl shadow-xl object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
