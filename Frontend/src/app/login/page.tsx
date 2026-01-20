"use client";
import LogInURL from "#/assets/images/login_img.jpg";
import Image from "next/image";
import Link from "next/link";
import { TiDelete } from "react-icons/ti";
import { useAuth } from "#/context/authContext";
import { useForm } from "react-hook-form";
import { loginValidation } from "#/utils/validation";
import { FcGoogle } from "react-icons/fc";

interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const { login, loginWithGoogle } = useAuth();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch, // Dùng watch để theo dõi giá trị input
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  // Theo dõi value để hiển thị nút xoá
  const watchFields = watch();

  const onSubmit = async (data: FormData) => {
    await login(data.email, data.password);
  };

  const handleClearField = (field: keyof FormData) => setValue(field, "");

  // Class tái sử dụng (giống trang Register để đồng bộ)
  const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClasses = "text-xs text-red-500 mt-1 min-h-[20px]";

  return (
    <section className="min-h-screen flex  justify-center p-4">
      {/* Container chính: Card nổi, bo góc */}
      <div className="bg-white w-full max-w-[1200px] h-auto lg:h-[700px] rounded-2xl shadow-xl overflow-hidden flex flex-col-reverse lg:flex-row">
        
        {/* --- CỘT TRÁI: FORM --- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-10">
          <div className="max-w-[450px] mx-auto w-full">
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Chào mừng trở lại!</h1>
            <p className="text-gray-500 mb-8 text-sm">Vui lòng nhập thông tin để đăng nhập.</p>

            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Email Field */}
              <div className="relative group">
                <label className={labelClasses}>Email</label>
                <div className="relative">
                  <input
                    {...register("email", loginValidation.email)}
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
                    {...register("password", loginValidation.password)}
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
                
                {/* Error & Forgot Password Layout */}
                <div className="flex justify-between items-start mt-1">
                    <p className={`${errorClasses} mt-0`}>{errors.password?.message}</p>
                    <Link 
                        href="/login/forgot-password" 
                        className="text-sm text-red-500 hover:text-red-600 font-semibold hover:underline whitespace-nowrap ml-2"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                </button>

                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3.5 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm"
                >
                  <FcGoogle size={22} />
                  <span>Đăng nhập với Google</span>
                </button>
              </div>

              {/* Footer Link */}
              <p className="text-center text-sm text-gray-600 mt-8">
                Bạn chưa có tài khoản?
                <Link href="/register" className="text-red-500 font-bold ml-2 hover:underline">
                  Tạo tài khoản ngay
                </Link>
              </p>

            </form>
          </div>
        </div>

        {/* --- CỘT PHẢI: ẢNH --- */}
        <div className="hidden lg:block w-1/2 relative h-[400px] lg:h-auto">
           {/* Image component với fill để ảnh luôn đẹp trong khung */}
          <Image 
            src={LogInURL} 
            alt="Ảnh Đăng nhập" 
            fill
            className="object-cover"
            priority
          />
          {/* Overlay tối nhẹ nếu cần */}
          <div className="absolute inset-0 bg-black/5"></div>
        </div>

      </div>
    </section>
  );
}