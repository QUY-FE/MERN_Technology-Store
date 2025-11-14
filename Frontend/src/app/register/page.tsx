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
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await registerUser(data.username, data.email, data.password);
    setTimeout(() => {
      login(data.email, data.password);
    }, 2000);
  };

  const handleClearField = (field: keyof FormData) => {
    setValue(field, "");
  };

  return (
    <section className="max-w-[1200px] mx-auto h-screen flex">
      <div className="hidden  lg:block w-6/12">
        <Image src={registerURL} alt="Ảnh Đăng ký" width={600} height={600} />
      </div>
      <div className="w-full lg:w-6/12">
        <form
          method="POST"
          className="w-full h-full pt-10 pl-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center text-3xl font-semibold  mb-4">Tạo tài khoản</h1>
          <div >
            <label htmlFor="" className="font-semibold my-4  text-sm">
              Nhập họ & tên
            </label>
            <div className="w-full flex items-center justify-between border-b-2  border-colorBorder ">
              <input
                {...register("username", registerValidation.username)}
                type="text"
                placeholder="Nhập họ và tên"
                className="cst_input"
              />
              <button
                onClick={() => handleClearField("username")}
                className="hidden w-10 h-10 hover:bg-black/10 group-focus-within:flex items-center justify-center rounded-full"
              >
                <TiDelete size={24}  />
              </button>

            </div>
            {errors.username && (
              <p className="w-full  text-red-500 font-semibold my-2">
                {errors.username.message || ""}
              </p>
            )}
          </div>
          <div >
            <label htmlFor="" className="font-semibold my-4  text-sm">
              Nhập Email
            </label>
            <div className="w-full flex items-center justify-between border-b-2 border-colorBorder group">
              <input
                {...register("email", registerValidation.email)}
                type="email"
                placeholder="Nhập Email"
                className="cst_input"
              />
              <button
                onClick={() => handleClearField("email")}
                className="hidden w-10 h-10 hover:bg-black/10 group-focus-within:flex items-center justify-center rounded-full"
              >
                <TiDelete size={24}  />
              </button>

            </div>
            {errors.email && (
              <p className="block w-full h-[25px] text-red-500 font-semibold my-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div >
            <label htmlFor="" className="font-semibold my-4  text-sm">
              Nhập mật khẩu
            </label>
            <div className="w-full flex items-center justify-between border-b-2 border-colorBorder group">
              <input
                {...register("password", registerValidation.password)}
                type="password"
                placeholder="Mật khẩu của bạn"
                className="cst_input"
              />
              <button
                onClick={() => handleClearField("password")}
                className="hidden w-10 h-10 hover:bg-black/10 group-focus-within:flex items-center justify-center rounded-full"
              >
                <TiDelete size={24}  />
              </button>

            </div>
            {errors.password && (
              <p className="block w-full h-[25px] text-red-500 font-semibold my-2">
                {errors.password.message}
              </p>
            )}
          </div>

            <div className="my-6">
            <p className="text-md text-center">
              Bằng việc đăng kí, bạn đã đồng ý với Shop chúng tôi về
            </p>
            <p className="text-sm text-center">
              <Link href="/" className="text-[#e34646]  underline">
                {" "}
                Điều khoản dịch vụ
              </Link>{" "}
              và{" "}
              <Link  href="/"  className="text-[#e34646]  underline">
                {" "}
                Chính sách bảo mật
              </Link>
            </p>

            </div>
          <button
            className="cst_btn-primary w-full h-[56px] text-xl font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý" : "Đăng ký"}
          </button>
          <button
            type="button"
            className="cst_btn w-full h-[55px]  flex items-center justify-center gap-4 text-lg font-bold"
            onClick={loginWithGoogle}
          >
             <FcGoogle size={24} />
            Đăng nhập với Google
          </button>
          <p className="w-full h-[30px] mt-10 text-center text-black/80">
            Bạn đã có tài khoản?
            <span className="ml-3 pb-0.5 font-semibold  border-b-2 border-[#b3b3b3] text-primary">
              <Link href="/login">Đăng nhập</Link>
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}
