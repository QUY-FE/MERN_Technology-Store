"use client";
import Link from "next/link";
import { TiDelete } from "react-icons/ti";
import { useAuth } from "#/context/authContext";
import { useForm } from "react-hook-form";
import { registerValidation } from "#/utils/validation";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Login from "#/components/Common/Login";
import type { RegisterForm } from "#/types";

export default function Register() {
  const { registerUser, login, loginWithGoogle } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const watchFields = watch();

  const onSubmit = async (data: RegisterForm) => {
    await registerUser(data.username, data.email, data.password);
    setTimeout(() => {
      login(data.email, data.password);
    }, 2000);
  };

  const handleClearField = (field: keyof FormData) => {
    setValue(field, "");
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClasses = "text-xs text-red-500 mt-1 min-h-[20px]";

  return (
    <>
      <section className=" mx-auto p-4 md:p-8  flex justify-center">
        <div className="bg-white w-full max-w-[1200px]   overflow-hidden flex">
          <div className="w-full flex justify-center ">
            <div className="w-[450px] shadow-lg rounded-lg mt-2 lg:mt-4 p-4 md:p-8">
              <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">
                Tạo tài khoản
              </h1>

              <form
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Username Field */}
                <div className="relative group">
                  <label className={labelClasses}>Họ và tên</label>
                  <div className="relative">
                    <input
                      {...register("username", registerValidation.username)}
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className={inputClasses}
                    />
                    {watchFields.username && (
                      <button
                        type="button"
                        onClick={() => handleClearField("username")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <TiDelete size={22} />
                      </button>
                    )}
                  </div>
                  <p className={errorClasses}>{errors.username?.message}</p>
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <label className={labelClasses}>Email</label>
                  <div className="relative">
                    <input
                      {...register("email", registerValidation.email)}
                      type="email"
                      placeholder="name@example.com"
                      className={inputClasses}
                    />
                    {watchFields.email && (
                      <button
                        type="button"
                        onClick={() => handleClearField("email")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <TiDelete size={22} />
                      </button>
                    )}
                  </div>
                  <p className={errorClasses}>{errors.email?.message}</p>
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <label className={labelClasses}>Mật khẩu</label>
                  <div className="relative">
                    <input
                      {...register("password", registerValidation.password)}
                      type="password"
                      placeholder="••••••••"
                      className={inputClasses}
                    />
                    {watchFields.password && (
                      <button
                        type="button"
                        onClick={() => handleClearField("password")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <TiDelete size={22} />
                      </button>
                    )}
                  </div>
                  <p className={errorClasses}>{errors.password?.message}</p>
                </div>

                {/* Terms & Conditions */}
                <div className="text-xs text-gray-500 text-center px-4 leading-relaxed">
                  Bằng việc đăng kí, bạn đã đồng ý với Shop về{" "}
                  <br className="hidden sm:block" />
                  <Link
                    href="/"
                    className="text-red-500 hover:underline font-medium mx-1"
                  >
                    Điều khoản dịch vụ
                  </Link>
                  &
                  <Link
                    href="/"
                    className="text-red-500 hover:underline font-medium mx-1"
                  >
                    Chính sách bảo mật
                  </Link>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cst_btn-primary w-full"
                  >
                    {isSubmitting ? "Đang xử lý..." : "Đăng ký tài khoản"}
                  </button>

                  <button
                    type="button"
                    onClick={loginWithGoogle}
                    className="cst_btn-icon w-full flex items-center justify-center gap-2"
                  >
                    <span>Đăng nhập với</span>
                    <FcGoogle size={20} />
                  </button>
                </div>

                {/* Footer Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                  Bạn đã có tài khoản?
                  <span
                    className="text-red-500 font-bold ml-2 hover:underline cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Đăng nhập
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

     {/* Modal Container */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[450px] max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <Login onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}