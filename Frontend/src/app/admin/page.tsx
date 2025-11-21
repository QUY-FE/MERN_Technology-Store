"use client";

import { TiDelete } from "react-icons/ti";

import { useForm } from "react-hook-form";
import { adminValidation } from "#/utils/validation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
    console.log(data);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const auth = res.data;

      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          toast.info("Hết hạn truy cập, hãy đăng nhập lại")
          router.push("/admin")
        }, 3600 * 1000);
        toast.success("Đăng nhập thành công")
        router.push("/admin/dashboard")
    }
    } catch (error) {console.error(error);}
  };

  const handleClearField = (field: keyof FormData) => setValue(field, "");

  return (
    <section className="max-w-screen-sm mx-auto h-screen flex">
      <div className="w-full">
        <form
          method="POST"
          className="w-full h-full pt-[100px] px-[10px] md:px-[16px] "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center text-3xl font-semibold  mb-4">
            Đăng nhập với quyền Admin
          </h1>
          <div>
            <label htmlFor="" className="font-semibold my-4  text-sm">
                Tên đăng nhập
            </label>
            <div className="w-full flex items-center justify-between border-b-2 border-colorBorder group">
              <input
                {...register("username", adminValidation.username)}
                type="text"
                placeholder="Nhập username"
                className="cst_input"
              />
              <button
                onClick={() => handleClearField("username")}
                className="hidden w-10 h-10 hover:bg-black/10 group-focus-within:flex items-center justify-center rounded-full"
              >
                <TiDelete size={24} />
              </button>
            </div>
            {errors.username && (
              <p className="block w-full h-[25px] text-red-500 font-semibold my-2">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="" className="font-semibold my-4 text-sm">
              Mật khẩu
            </label>
            <div className="w-full flex items-center justify-between border-b-2 border-colorBorder group">
              <input
                {...register("password", adminValidation.password)}
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

          <div className="w-full">
            <button
              className="cst_btn-primary w-full h-[56px] text-xl font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý . . ." : "Đăng nhập"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
