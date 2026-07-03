"use client";
import { useAuth } from "#/context/authContext";
import { loginValidation } from "#/utils/validation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TiDelete } from "react-icons/ti";

interface FormData {
  email: string;
}

export default function Page() {
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data.email);
    await resetPassword(data.email);
  };
  const handleClearField = (field: keyof FormData) => {
    setValue(field, "");
  };
  return (
    <div className="max-w-[1200px] mx-auto h-[50vh] flex items-center justify-center">
      <form
        action=""
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px]  rounded-md shadow-lg py-2 px-4 "
      >
        <h1 className="text-3xl text-center py-4 font-semibold">
          Quên mật khẩu
        </h1>
        <label htmlFor="" className="font-semibold my-4 text-sm">
          Nhập email của bạn :
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
        <div >
            <button
            className="cst_btn-primary w-full h-[56px]"
            disabled={isSubmitting}
            >
            {isSubmitting ? "Đang xử lý" : "Gửi"}
            </button>
            <button className="cst_btn w-full h-[56px] ">
                <Link href="/login" className="block w-full h-full"> 
                    Quay lại
                </Link>
            </button>

        </div>
      </form>
    </div>
  );
}
