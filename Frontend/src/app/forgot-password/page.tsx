"use client";
import { useAuth } from "#/context/authContext";
import { loginValidation } from "#/utils/validation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify/unstyled";


interface FormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await resetPassword(data.email);
      toast.success("Vui lòng kiểm tra email của bạn để đặt lại mật khẩu!");
    }
    catch (error) {
      console.error(error);
      toast.error("Gửi yêu cầu đặt lại mật khẩu không thành công. Vui lòng thử lại.");
    }
  };
  
  return (
    <div className="max-w-[1200px] mx-auto h-screen flex justify-center pt-20">
      <form
        action=""
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="w-[450px] h-[300px]  rounded-md shadow-lg py-2 px-4 "
      >
        <h1 className="text-3xl text-center py-4 font-medium  text-gray-600">
          Quên mật khẩu ?
        </h1>
        <label htmlFor="email" className="font-semibold my-4 text-sm text-gray-600">
          Email
          <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email", loginValidation.email)}
          type="Email"
          placeholder="Nhập Email của bạn..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400"
        />

        {errors.email && (
          <p className="block w-full text-red-500 text-sm my-2">
            {errors.email.message}
          </p>
        )}
        <div className="flex  justify-center gap-4 mt-4">
          <Link href="/" className="cst_btn-icon">
            <ArrowLeft size={20} />
            Quay về trang chủ
          </Link>
          <button className="cst_btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý" : "Gửi"}
          </button>
        </div>
      </form>
    </div>
  );
}
