"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, X } from "lucide-react";
import { useAuth } from "#/context/authContext";
import type { AuthView } from "#/context/authModalContext";
import { loginValidation, registerValidation } from "#/utils/validation";

type AuthFields = {
  username: string;
  email: string;
  password: string;
};

type Props = {
  isOpen: boolean;
  view: AuthView;
  onViewChange: (view: AuthView) => void;
  onClose: () => void;
  onSuccess: () => void;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition-colors focus:border-primary focus:bg-white focus:ring-2 focus:ring-sky-100";
const labelClass = "mb-2 block text-sm font-semibold text-gray-700";
const errorClass = "mt-1 min-h-5 text-xs text-red-600";

export default function AuthModal({ isOpen, view, onViewChange, onClose, onSuccess }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { login, registerUser, loginWithGoogle, resetPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [googlePending, setGooglePending] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    clearErrors,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<AuthFields>({ defaultValues: { username: "", email: "", password: "" } });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => setFocus("email"), 0);

    return () => {
      clearTimeout(focusTimer);
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, setFocus]);

  const changeView = (nextView: AuthView, focusEmail = true) => {
    if (nextView === view) return;
    const email = getValues("email");
    reset({ username: "", email, password: "" });
    clearErrors();
    setShowPassword(false);
    setResetSent(false);
    onViewChange(nextView);
    if (focusEmail) setTimeout(() => setFocus("email"), 0);
  };

  const submit = handleSubmit(async (data) => {
    try {
      if (view === "forgot") {
        await resetPassword(data.email);
        setResetSent(true);
      } else if (view === "register") {
        await registerUser(data.username, data.email, data.password);
        onSuccess();
      } else {
        await login(data.email, data.password);
        onSuccess();
      }
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Có lỗi xảy ra. Vui lòng thử lại.",
      });
    }
  });

  const signInWithGoogle = async () => {
    setGooglePending(true);
    clearErrors("root");
    try {
      await loginWithGoogle();
      onSuccess();
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Đăng nhập Google thất bại.",
      });
    } finally {
      setGooglePending(false);
    }
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, current: AuthView) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = current === "login" ? "register" : "login";
    changeView(next, false);
    document.getElementById(`auth-tab-${next}`)?.focus();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="auth-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}
      className="w-[calc(100%-2rem)] max-w-[480px] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border-0 bg-white p-0 text-left shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative px-5 py-7 sm:px-9 sm:py-9">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng cửa sổ xác thực"
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          <X size={20} />
        </button>

        <h2 id="auth-title" className="mb-2 pr-8 text-2xl font-bold text-gray-900">
          {view === "login" ? "Chào mừng trở lại!" : view === "register" ? "Tạo tài khoản" : "Quên mật khẩu?"}
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          {view === "forgot" ? "Nhập email để nhận liên kết đặt lại mật khẩu." : "Chào mừng bạn đến với QN Shop."}
        </p>

        {view !== "forgot" && (
          <div role="tablist" aria-label="Tài khoản" className="mb-6 grid grid-cols-2 rounded-lg bg-gray-100 p-1">
            {(["login", "register"] as const).map((tab) => (
              <button
                key={tab}
                id={`auth-tab-${tab}`}
                type="button"
                role="tab"
                aria-selected={view === tab}
                aria-controls="auth-panel"
                tabIndex={view === tab ? 0 : -1}
                onClick={() => changeView(tab)}
                onKeyDown={(event) => onTabKeyDown(event, tab)}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${view === tab ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                {tab === "login" ? "Đăng nhập" : "Đăng ký"}
              </button>
            ))}
          </div>
        )}

        <div key={view} id="auth-panel" role={view === "forgot" ? undefined : "tabpanel"} aria-labelledby={view === "forgot" ? undefined : `auth-tab-${view}`} className="auth-panel">
          <form onSubmit={submit} noValidate className="space-y-4">
            {view === "register" && (
              <div>
                <label htmlFor="auth-username" className={labelClass}>Họ và tên</label>
                <input id="auth-username" type="text" autoComplete="name" className={inputClass} {...register("username", registerValidation.username)} />
                <p className={errorClass}>{errors.username?.message}</p>
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className={labelClass}>Email</label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                className={inputClass}
                {...register("email", loginValidation.email)}
              />
              <p className={errorClass}>{errors.email?.message}</p>
            </div>

            {view !== "forgot" && (
              <div>
                <label htmlFor="auth-password" className={labelClass}>Mật khẩu</label>
                <div className="relative">
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={view === "register" ? "new-password" : "current-password"}
                    className={`${inputClass} pr-12`}
                    {...register("password", view === "register" ? registerValidation.password : loginValidation.password)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:text-primary"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
                <p className={errorClass}>{errors.password?.message}</p>
              </div>
            )}

            {view === "login" && (
              <button type="button" onClick={() => changeView("forgot")} className="block ml-auto text-sm font-semibold text-red-600 hover:underline">
                Quên mật khẩu?
              </button>
            )}

            {view === "register" && (
              <p className="text-center text-xs leading-relaxed text-gray-500">
                Bằng việc đăng ký, bạn đồng ý với QN Shop về{" "}
                <a href="/terms&policy" className="font-medium text-red-600 hover:underline">Điều khoản dịch vụ và Chính sách bảo mật</a>.
              </p>
            )}

            {errors.root?.message && <p role="alert" className="text-sm text-red-600">{errors.root.message}</p>}
            {resetSent && <p role="status" className="text-sm text-green-700">Vui lòng kiểm tra email để đặt lại mật khẩu.</p>}

            <button type="submit" disabled={isSubmitting || googlePending} className="cst_btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Đang xử lý..." : view === "login" ? "Đăng nhập" : view === "register" ? "Đăng ký tài khoản" : "Gửi liên kết đặt lại"}
            </button>
          </form>

          {view !== "forgot" ? (
            <>
              <div className="my-4 flex items-center gap-3 text-xs text-gray-400"><span className="h-px flex-1 bg-gray-200" />hoặc<span className="h-px flex-1 bg-gray-200" /></div>
              <button type="button" onClick={signInWithGoogle} disabled={isSubmitting || googlePending} className="cst_btn-secondary w-full disabled:cursor-not-allowed disabled:opacity-60">
                <FcGoogle size={21} />
                {googlePending ? "Đang xử lý..." : "Tiếp tục với Google"}
              </button>
            </>
          ) : (
            <button type="button" onClick={() => changeView("login")} className="mt-4 w-full text-center text-sm font-semibold text-primary hover:underline">
              Quay lại đăng nhập
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}
