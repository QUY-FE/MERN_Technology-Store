"use client";
// thư viện
import { ToastContainer } from "react-toastify";

//  import components
import Header from "#/components/Header";
import Footer from "#/components/Footer";
// import file css
import "react-multi-carousel/lib/styles.css";
import "#/assets/css/globals.css";
// import icons

// import và set font chữ
import { Archivo } from "next/font/google";
import { AuthProvider } from "#/context/authContext";
import { Provider } from "react-redux";
import { store } from "#/redux/store";
import { useEffect } from "react";
import { loadCartFromStorage } from "#/redux/features/cartSlice";
import { usePathname } from "next/navigation";
const geistArchivo = Archivo({
  variable: "--font-geist-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
    <html lang="vi">
      <body className={`${geistArchivo.variable}  antialiased relative`}>
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
      </body>
    </html>
  );
}
