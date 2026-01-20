"use client";
import registerURL from "#/assets/images/register_img.jpg";
import Image from "next/image";
import Link from "next/link";
import { TiDelete } from "react-icons/ti";
import { useAuth } from "#/context/authContext";
import { useForm } from "react-hook-form";
import { registerValidation } from "#/utils/validation";
import { FcGoogle } from "react-icons/fc";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function SignIn() {
  const { registerUser, login, loginWithGoogle } = useAuth();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch, // Dùng watch để check xem input có value không thì mới hiện nút xoá
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  // Watch values để hiển thị nút clear động
  const watchFields = watch();

  const onSubmit = async (data: FormData) => {
    await registerUser(data.username, data.email, data.password);
    setTimeout(() => {
      login(data.email, data.password);
    }, 2000);
  };

  const handleClearField = (field: keyof FormData) => {
    setValue(field, "");
  };

  // Class chung cho input để tái sử dụng và đồng bộ
  const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClasses = "text-xs text-red-500 mt-1 min-h-[20px]"; // min-h để giữ chỗ tránh giật layout

  return (
    <section className="min-h-screen  flex justify-center p-4">
      <div className="bg-white w-full max-w-[1200px] h-auto lg:h-[800px] rounded-2xl shadow-xl overflow-hidden flex">
        
        {/* --- CỘT TRÁI: ẢNH --- */}
        <div className="hidden lg:block w-1/2 relative h-full">
           {/* Dùng object-cover để ảnh luôn full đẹp */}
          <Image 
            src={registerURL} 
            alt="Ảnh Đăng ký" 
            fill
            className="object-cover"
            priority
          />
          {/* Một lớp phủ nhẹ nếu cần text đè lên ảnh, ở đây optional */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* --- CỘT PHẢI: FORM --- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-10">
          <div className="max-w-[450px] mx-auto w-full">
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Tạo tài khoản</h1>
            <p className="text-gray-500 mb-8 text-sm">Chào mừng bạn đến với Shop, vui lòng nhập thông tin.</p>

            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
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
                Bằng việc đăng kí, bạn đã đồng ý với Shop về <br className="hidden sm:block"/>
                <Link href="/" className="text-red-500 hover:underline font-medium mx-1">
                  Điều khoản dịch vụ
                </Link> 
                & 
                <Link href="/" className="text-red-500 hover:underline font-medium mx-1">
                  Chính sách bảo mật
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang xử lý..." : "Đăng ký tài khoản"}
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
              <p className="text-center text-sm text-gray-600 mt-6">
                Bạn đã có tài khoản?
                <Link href="/login" className="text-red-500 font-bold ml-2 hover:underline">
                  Đăng nhập
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}