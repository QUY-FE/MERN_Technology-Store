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
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await login(data.email, data.password);
  };

  const handleClearField = (field: keyof FormData) => setValue(field, "");

  return (
    <section className="max-w-[1200px] mx-auto h-screen flex">
      <div className="w-full lg:w-6/12  ">
        <form
          method="POST"
          className="w-full h-full pt-[100px] px-[10px] md:px-[16px] "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center text-3xl font-semibold  mb-4">Đăng nhập</h1>
          <div>
            <label htmlFor="" className="font-semibold my-4  text-sm">
              Nhập Email
            </label>
            <div className="w-full flex items-center justify-between border-b-2 border-colorBorder group">
              <input
                {...register("email", loginValidation.email)}
                type="email"
                placeholder="Nhập Email"
                className="cst_input"
              />
              <button
                onClick={() => handleClearField("email")}
                className="hidden w-10 h-10 hover:bg-black/10 group-focus-within:flex items-center justify-center rounded-full"
              >
                <TiDelete size={24} />
              </button>
            </div>
            {errors.email && (
              <p className="block w-full h-[25px] text-red-500 font-semibold my-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="" className="font-semibold my-4 text-sm">
              Nhập mật khẩu
            </label>
            <div className="w-full flex items-center justify-between border-b-2 border-colorBorder group">
              <input
                {...register("password", loginValidation.password)}
                type="password"
                placeholder="Mật khẩu của bạn"
                className="cst_input"
              />
              <button
                onClick={() => handleClearField("password")}
                className="hidden w-10 h-10 hover:bg-black/10 group-focus-within:flex items-center justify-center rounded-full"
              >
                <TiDelete size={24} />
              </button>
            </div>
            {errors.password && (
              <p className="block w-full h-[25px] text-red-500 font-semibold my-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <p className="font-sm py-2 mt-3 text-[#e34646]  underline">
            <Link href="/login/forgot-password">Quên mật khẩu ?</Link>
          </p>
          <div className="w-full">
            <button
              className="cst_btn-primary w-full h-[56px] text-xl font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý" : "Đăng nhập"}
            </button>
            <button
              className="cst_btn w-full h-[56px] flex items-center justify-center gap-4 text-lg font-bold"
              onClick={loginWithGoogle}
            >
              <FcGoogle size={24} />
              Đăng nhập với Google
            </button>
          </div>
          <p className="w-full h-[30px] mt-10 text-center text-black/80">
            Bạn chưa có tài khoản?
            <span className="ml-3 pb-0.5 font-semibold  border-b-2 border-[#b3b3b3] text-primary">
              <Link href="/register">Tạo tài khoản</Link>
            </span>
          </p>
        </form>
      </div>
      <div className="hidden lg:block w-6/12">
        <Image src={LogInURL} alt="Ảnh Đăng nhập" width={600} height={600}/>
      </div>
    </section>
  );
}
