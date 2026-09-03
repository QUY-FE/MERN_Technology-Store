"use client";

import { TiDelete } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { adminValidation } from "#/utils/validation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import type { LoginForm } from "#/types";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();
  
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
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
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
        
        <div className="bg-primary p-6 text-center relative">
            

            <h1 className="text-2xl font-bold text-white uppercase tracking-wide">
                Admin
            </h1>
            <p className="text-red-100 text-sm mt-1">Đăng nhập để quản lý hệ thống</p>
        </div>

        <form
          method="POST"
          className="p-8 pt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                  ${errors.username ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-primary focus:ring-primary'}
                `}
              />
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
                  ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-500 focus:ring-primary'}
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
              className="cst_btn-primary w-full"
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
                className="cst_btn-secondary-icon"
            >
                <IoLogOutOutline size={18}/> Thoát ứng dụng
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}