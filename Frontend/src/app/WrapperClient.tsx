"use client";
import { ToastContainer } from "react-toastify";
import Header from "#/components/Layout/Header/Header";
import Footer from "#/components/Layout/Footer";
import { AuthProvider } from "#/context/authContext";
import { AuthModalProvider } from "#/context/authModalContext";
import { Provider } from "react-redux";
import { store } from "#/redux/store";
import { Suspense, useEffect } from "react";
import { loadCartFromStorage } from "#/redux/features/cartSlice";
import { usePathname } from "next/navigation";
import StorefrontBreadcrumbs from "#/components/Common/StorefrontBreadcrumbs";

export default function WrapperClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(loadCartFromStorage());
  }, []);
  const pathname = usePathname();
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");
  const decoration =
    pathname === "/admin" ||
    pathname === "/admin/dashboard" ||
    pathname === "/admin/products" ||
    pathname === "/admin/orders" ||
    pathname === "/admin/users" ||
    pathname === "/admin/news" ||
    pathname === "/admin/contacts" ||
    pathname === "/admin/products/create" ||
    pathname.startsWith("/admin/products/edit/") ||
    pathname.startsWith("/admin/products/") ||
    pathname.startsWith("/admin/orders/") ||
    pathname.startsWith("/admin/news/") ||
    pathname.startsWith("/admin/contacts/");

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
        <AuthModalProvider>
          {decoration ? null : <Header />}
          <div className={`w-full min-h-screen${isAdminPath ? "" : " bg-[#F7F9FC]"}`}>
            <main>
              {!isAdminPath && (
                <Suspense fallback={null}>
                  <StorefrontBreadcrumbs />
                </Suspense>
              )}
              {children}
            </main>
          </div>
          {decoration ? null : <Footer />}
        </AuthModalProvider>
      </Provider>
    </AuthProvider>
  );
}
