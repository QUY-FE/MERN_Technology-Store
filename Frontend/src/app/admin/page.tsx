"use client";

import { TiDelete } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { adminValidation } from "#/utils/validation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { IoArrowBack, IoLogOutOutline } from "react-icons/io5";

interface FormData {
  username: string;
  password: string;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const auth = res.data;

      if (auth.token) {
        localStorage.setItem("token", auth.token);
        // Lưu ý: Logic setTimeout này hơi lạ, thường token hết hạn xử lý ở interceptor
        // Nhưng mình vẫn giữ nguyên logic của bạn
        setTimeout(() => {
          localStorage.removeItem("token");
          toast.info("Hết hạn truy cập, hãy đăng nhập lại");
          router.push("/admin");
        }, 3600 * 1000);
        
        toast.success("Đăng nhập thành công");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập thất bại");
    }
  };

  const handleClearField = (field: keyof FormData) => setValue(field, "");

  return (
    // 1. Background xám nhẹ + Flex center để căn giữa mọi thứ
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      {/* 2. Card container: Trắng, Bo góc, Đổ bóng */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
        
        {/* Header của Card */}
        <div className="bg-red-500 p-6 text-center relative">
            {/* Nút thoát ở góc trái trên cùng */}
            <Link href="/" className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors" title="Thoát về trang chủ">
                <IoArrowBack size={24} />
            </Link>

            <h1 className="text-2xl font-bold text-white uppercase tracking-wide">
                Admin Portal
            </h1>
            <p className="text-red-100 text-sm mt-1">Đăng nhập để quản lý hệ thống</p>
        </div>

        {/* Form Body */}
        <form
          method="POST"
          className="p-8 pt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Username Field */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Tên đăng nhập
            </label>
            <div className="relative group">
              <input
                {...register("username", adminValidation.username)}
                type="text"
                placeholder="Nhập username..."
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 
                  ${errors.username ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-500 focus:ring-red-200'}
                `}
              />
              {/* Nút xóa clear field */}
              <button
                type="button"
                onClick={() => handleClearField("username")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 hidden group-focus-within:block transition-colors"
              >
                <TiDelete size={22} />
              </button>
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Mật khẩu
            </label>
            <div className="relative group">
              <input
                {...register("password", adminValidation.password)}
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                  ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-500 focus:ring-red-200'}
                `}
              />
               <button
                type="button"
                onClick={() => handleClearField("password")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 hidden group-focus-within:block transition-colors"
              >
                <TiDelete size={22} />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                 <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                 "Đăng nhập"
              )}
            </button>

            {/* Nút Thoát phụ (Option 2) */}
            <Link 
                href="/"
                className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-800 font-medium py-2 transition-colors text-sm"
            >
                <IoLogOutOutline size={18}/> Thoát ứng dụng
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}