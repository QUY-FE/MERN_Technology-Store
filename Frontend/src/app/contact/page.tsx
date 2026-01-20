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
    <section className="max-w-[1200px] mx-auto flex flex-col-reverse  lg:grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
      {/* Thông tin liên hệ - Giữ nguyên UI */}
      <div className="rounded-2xl flex flex-col items-center justify-center lg:text-lg text-xs">
        <div className="w-full pb-4 px-4 lg:px-0 ">
          <h1 className="mb-4 text-2xl font-semibold flex items-center gap-4">
            <span className="w-10 h-10 flex items-center justify-center bg-[#e34646] rounded-full text-white">
              <FaPhone />
            </span>
            Hotline
          </h1>
          <p className="mb-2 text-sm">
            Chúng tôi luôn nghe bạn ^_^
          </p>
          <p className="mb-2 ">Số điện thoại : <span className="font-bold">1900 xxxx</span></p>
        </div>
        <div className="w-full pb-4 px-4 lg:px-0">
          <h1 className="mb-4 text-2xl font-semibold flex items-center gap-4">
            <span className="w-10 h-10 flex items-center justify-center bg-[#e34646] rounded-full text-white">
              <TbMail />
            </span>
            Email
          </h1>
          <p className="mb-2 text-sm">
            Chúng tôi sẽ phản hồi sớm nhất tới bạn trong vòng 24h
          </p>
          <p className="mb-2">Email: <span className="font-bold">cskh.qnshop@gmail.com</span></p>
          
        </div>
      </div>

      {/* Form liên hệ - Refactor với react-hook-form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-lg mt-10 px-2 py-4 lg:px-8 lg:py-10"
      >
        <h1 className="text-2xl text-center mb-4 font-semibold text-black/90">
          Liên hệ
        </h1>

        <ul className=" mb-6">
          

          {/* Input Username */}
          <li className="flex flex-col gap-1 py-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-black/80"
            >
              Họ & tên :
            </label>
            <input
              type="text"
              placeholder="--- Nhập họ tên ---"
              className={`w-full pl-3 py-3 font-semibold outline-none rounded-lg bg-black/5 border ${errors.username ? 'border-red-500' : 'border-transparent'}`}
              {...register("username", { required: "Vui lòng nhập đầy đủ họ & tên" })}
            />
            {errors.username && (
              <span className="text-xs text-red-500">
                {errors.username.message}
              </span>
            )}
          </li>

          {/* Input Phone Number */}
          <li className="flex flex-col gap-1 py-1">
            <label
              htmlFor="number"
              className="text-sm font-semibold text-black/80"
            >
              Số điện thoại :
            </label>
            <input
              type="text"
              placeholder="+84 xxxxxxxxxx"
              className={`w-full pl-3 py-3 font-semibold outline-none rounded-lg bg-black/5 border ${errors.number ? 'border-red-500' : 'border-transparent'}`}
              {...register("number", {
                required: "Vui lòng nhập số điện thoại",
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
        <div className="w-full h-[200px] mb-2 rounded-lg flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-black/80"
          >
            Nội dung :
          </label>
          <textarea
            placeholder="Nội dung liên hệ . . ."
            className={`w-full h-full p-3 outline-none resize-none rounded-lg bg-black/5 border ${errors.description ? 'border-red-500' : 'border-transparent'}`}
            {...register("description", { required: "Vui lòng nhập nội dung cần liên hệ" })}
          />
          {errors.description && (
            <span className="text-xs text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" primary w={180} h={48} text="Gửi" />
        </div>
      </form>
    </section>
  );
}