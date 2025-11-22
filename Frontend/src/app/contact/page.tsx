"use client";

import Button from "#/components/Button"; // Giữ nguyên component Button của bạn
import { useForm, SubmitHandler } from "react-hook-form";
import { FaPhone } from "react-icons/fa6";
import { TbMail } from "react-icons/tb";
import { toast } from "react-toastify";

// Định nghĩa kiểu dữ liệu cho form
type ContactFormValues = {
  email: string;
  username: string;
  number: string;
  description: string;
};

export default function Contact() {
  // Khởi tạo react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>();

  // Hàm xử lý khi submit thành công (đã qua validation)
  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log("Form Data:", data);
    
    // Giả lập gửi dữ liệu thành công
    toast.success("Chúng tôi sẽ sớm phản hồi lại");
    
    // Reset form về rỗng sau khi gửi
    reset();
  };


  return (
    <section className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mt-20">
      {/* Thông tin liên hệ - Giữ nguyên UI */}
      <div className="rounded-2xl px-8 py-10 ">
        <div className="pb-4">
          <h1 className="mb-4 text-2xl font-semibold flex items-center gap-4">
            <span className="w-10 h-10 flex items-center justify-center bg-[#e34646] rounded-full text-white">
              <FaPhone />
            </span>
            Gọi cho chúng tôi
          </h1>
          <p className="mb-2 text-sm">
            Chúng tôi luôn nghe 24/7 tất cả các ngày trong tuần
          </p>
          <p className="mb-2">Số điện thoại: 02xxxxxxxxxx</p>
        </div>
        <div className="pb-4">
          <h1 className="mb-4 text-2xl font-semibold flex items-center gap-4">
            <span className="w-10 h-10 flex items-center justify-center bg-[#e34646] rounded-full text-white">
              <TbMail />
            </span>
            Gửi tin nhắn
          </h1>
          <p className="mb-2 text-sm">
            Chúng tôi sẽ phản hồi sớm nhất trong 24h
          </p>
          <p className="mb-2">Email: cskhQn@gmail.com</p>
          
        </div>
      </div>

      {/* Form liên hệ - Refactor với react-hook-form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-lg rounded-2xl px-8 py-10 flex flex-col bg-white"
      >
        <h1 className="text-2xl mb-4 font-semibold text-black/90">
          Nhập thông tin của bạn
        </h1>

        <ul className=" mb-6">
          {/* Input Email */}
          <li className="flex flex-col gap-1 py-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-black/80"
            >
              Nhập email
            </label>
            <input
              type="email"
              placeholder="VD: user1@gmail.com"
              className={`w-full pl-3 py-3 font-semibold outline-none rounded-lg bg-black/5 border ${errors.email ? 'border-red-500' : 'border-transparent'}`}
              {...register("email", {
                required: "Email là bắt buộc",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không hợp lệ",
                },
              })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email.message}</span>
            )}
          </li>

          {/* Input Username */}
          <li className="flex flex-col gap-1 py-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-black/80"
            >
              Nhập họ tên
            </label>
            <input
              type="text"
              placeholder="Nguyễn văn A"
              className={`w-full pl-3 py-3 font-semibold outline-none rounded-lg bg-black/5 border ${errors.username ? 'border-red-500' : 'border-transparent'}`}
              {...register("username", { required: "Họ tên là bắt buộc" })}
            />
            {errors.username && (
              <span className="text-xs text-red-500">
                {errors.username.message}
              </span>
            )}
          </li>

          {/* Input Phone Number */}
          <li className="flex flex-col gap-1 py-2">
            <label
              htmlFor="number"
              className="text-sm font-semibold text-black/80"
            >
              Nhập số điện thoại
            </label>
            <input
              type="text"
              placeholder="VD:0364XXXXXXXX"
              className={`w-full pl-3 py-3 font-semibold outline-none rounded-lg bg-black/5 border ${errors.number ? 'border-red-500' : 'border-transparent'}`}
              {...register("number", {
                required: "SĐT là bắt buộc",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Chỉ được nhập số",
                },
                minLength: {
                  value: 10,
                  message: "Tối thiểu 10 số",
                },
              })}
            />
            {errors.number && (
              <span className="text-xs text-red-500">{errors.number.message}</span>
            )}
          </li>
        </ul>

        {/* Textarea Description */}
        <div className="w-full h-[200px] mb-6 rounded-lg flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-black/80"
          >
            Nhập nội dung
          </label>
          <textarea
            placeholder="Lý do liên hệ"
            className={`w-full h-full p-3 outline-none resize-none rounded-lg bg-black/5 border ${errors.description ? 'border-red-500' : 'border-transparent'}`}
            {...register("description", { required: "Vui lòng nhập nội dung" })}
          />
          {errors.description && (
            <span className="text-xs text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" primary w={215} h={56} text="Gửi" />
        </div>
      </form>
    </section>
  );
}