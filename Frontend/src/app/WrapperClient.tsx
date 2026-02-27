"use client";
import { ToastContainer } from "react-toastify";
import Header from "#/components/Header";
import Footer from "#/components/Footer";
import { AuthProvider } from "#/context/authContext";
import { Provider } from "react-redux";
import { store } from "#/redux/store";
import { useEffect } from "react";
import { loadCartFromStorage } from "#/redux/features/cartSlice";
import { usePathname } from "next/navigation";

export default function WrapperClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(loadCartFromStorage());
  }, []);
  const pathname = usePathname();
  const decoration =
    pathname === "/admin" ||
    pathname === "/admin/dashboard" ||
    pathname === "/admin/products" ||
    pathname === "/admin/orders" ||
    pathname === "/admin/users" ||
    pathname === "/admin/products/create" ||
    pathname.startsWith("/admin/products/edit/") ||
    pathname.startsWith("/admin/products/") ||
    pathname.startsWith("/blog/");

  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Provider store={store}>
        {decoration ? null : <Header />}
        <div className="w-full min-h-screen">
          <main>{children}</main>
        </div>
        {decoration ? null : <Footer />}
      </Provider>
    </AuthProvider>
  );
}
