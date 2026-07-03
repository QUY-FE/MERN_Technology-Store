"use client";

import { CreateContactDto, useCreateContactMutation } from "#/redux/features/contactApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaPhone } from "react-icons/fa6";
import { TbMail } from "react-icons/tb";
import { toast } from "react-toastify";


export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateContactDto>();
  const [createContact] = useCreateContactMutation();

  const onSubmit: SubmitHandler<CreateContactDto> = async (data) => {
    try {
      const contactData = {
        ...data,
        status: "Đang xử lý",
      };
      await createContact(contactData).unwrap();
      reset();
      toast.success("Chúng tôi sẽ sớm phản hồi lại!");
    } catch (error) {
      console.error(error);
      toast.error("Gửi liên hệ không thành công. Vui lòng thử lại.");
    }
  };

  const inputStyles =
    "w-full pl-4 py-3 text-sm text-gray-700 outline-none rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-red-400/20 focus:border-red-400 transition-all duration-300";

  return (
    <section className="max-w-6xl mx-auto flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 mt-10 px-4 xl:px-0">
      <div className="flex flex-col justify-center space-y-8 lg:pr-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Bạn có câu hỏi, đề xuất hoặc cần hỗ trợ? Đừng ngần ngại để lại thông
            tin, đội ngũ của chúng tôi sẽ liên hệ lại với bạn trong thời gian
            sớm nhất.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 group cursor-default">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-red-50 text-[#e34646] rounded-full    shadow-sm">
              <FaPhone size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Hotline</h3>
              <p className="text-gray-500 text-sm mt-1">
                Chúng tôi luôn lắng nghe bạn
              </p>
              <p className="text-gray-900 font-medium mt-1">1900 0000</p>
            </div>
          </div>

          <div className="flex items-start gap-4 group cursor-default">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-red-50 text-[#e34646] rounded-full    shadow-sm">
              <TbMail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Email</h3>
              <p className="text-gray-500 text-sm mt-1">Phản hồi 24/7</p>
              <p className="text-gray-900 font-medium mt-1">
                cskh.qnshop@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CỘT FORM LIÊN HỆ --- */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-6 lg:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Gửi tin nhắn
          </h2>

          {/* Họ & tên */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Họ & tên <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="Nhập họ tên của bạn"
              className={`${inputStyles} ${errors.username ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
              {...register("username", {
                required: "Vui lòng nhập đầy đủ họ & tên",
              })}
            />
            {errors.username && (
              <span className="text-xs text-red-500 ml-1">
                {errors.username.message}
              </span>
            )}
          </div>

          

          {/* Số điện thoại */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="number"
              className="text-sm font-medium text-gray-700"
            >
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              id="number"
              type="text"
              placeholder="+84 xxxxxxxxxx"
              className={`${inputStyles} ${errors.number ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
              {...register("number", {
                required: "Vui lòng nhập số điện thoại",
                pattern: { value: /^[0-9]+$/, message: "Chỉ được nhập số" },
                minLength: { value: 10, message: "Tối thiểu 10 số" },
              })}
            />
            {errors.number && (
              <span className="text-xs text-red-500 ml-1">
                {errors.number.message}
              </span>
            )}
          </div>

          {/* Nội dung */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Nội dung <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              placeholder="Bạn cần chúng tôi hỗ trợ gì?"
              rows={4}
              className={`resize-none ${inputStyles} ${errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
              {...register("description", {
                required: "Vui lòng nhập nội dung cần liên hệ",
              })}
            />
            {errors.description && (
              <span className="text-xs text-red-500 ml-1">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Nút Submit */}
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="cst_btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
