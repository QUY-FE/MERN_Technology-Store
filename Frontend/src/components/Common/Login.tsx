"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "#/context/authContext";
import { loginValidation } from "#/utils/validation";
import { useState } from "react";
import { Eye } from "lucide-react";
import type { LoginForm } from "#/types";

interface LoginProps {
  onClose?: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const { login, loginWithGoogle } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const watchFields = watch();

  const onSubmit = async (data: LoginForm) => {
    await login(data.email, data.password);
    if (onClose) onClose(); 
  };

  const handleClearField = (field: keyof FormData) => setValue(field, "");

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClasses = "text-xs text-red-500 mt-1 min-h-[20px]";

  return (
    <section className="flex justify-center w-full">
      <div className="bg-white w-full max-w-[1200px] h-auto lg:h-[700px] rounded-2xl shadow-xl overflow-hidden flex flex-col-reverse lg:flex-row">
        <div className="w-full flex flex-col justify-center px-8 lg:px-10 py-10">
          <div className="max-w-[450px] mx-auto w-full">
            <h1 className="text-3xl text-center font-bold text-gray-800 mb-2 md:mb-4">
              Chào mừng trở lại!
            </h1>
            
            <form
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="relative group">
                <label className={labelClasses}>Nhập Email </label>
                <div className="relative">
                  <input
                    {...register("email", loginValidation.email)}
                    type="email"
                    placeholder="name@example.com"
                    className={inputClasses}
                  />
                 
                </div>
                <p className={errorClasses}>{errors.email?.message}</p>
              </div>

              <div className="relative group">
                <label className={labelClasses}>Mật khẩu <span className="text-red-500">*</span> </label>
                <div className="relative">
                  <input
                    {...register("password", loginValidation.password)}
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    className={inputClasses}
                  />
                  {watchFields.password && (
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Eye size={22} />
                    </button>
                  )}
                </div>

                <div className="flex justify-between items-start mt-1">
                  <p className={`${errorClasses} mt-0`}>
                    {errors.password?.message}
                  </p>
                  <Link
                    href="/forgot-password"
                    onClick={onClose} 
                    className="pt-2 text-sm text-red-500 hover:text-red-600 font-semibold hover:underline whitespace-nowrap ml-2"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cst_btn-primary-icon w-full"
                >
                  {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                </button>

                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="cst_btn-icon w-full"
                >
                  <span>Đăng nhập với</span>
                  <FcGoogle size={22} />
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 mt-8">
                Bạn chưa có tài khoản?
                <Link
                  href="/register"
                  onClick={onClose}
                  className="text-red-500 font-bold ml-2 hover:underline"
                >
                  Tạo tài khoản ngay
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}