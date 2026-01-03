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

// export const metadata = {
//   title: 'QN Technology Store - Đồ công nghệ giá rẻ',
//   description: 'Săn sale đồ gaming hot, giảm giá lên đến 50% tại QN Technology Store.',
  
//   openGraph: {
//     title: 'QN Technology Store - Đồ công nghệ giá rẻ',
//     description: 'Mua đồ gaming online giá rẻ, giao hàng nhanh toàn quốc.',
//     url: 'https://qn-technology-store.vercel.app',
//     siteName: 'QN Technology Store',
//     images: [
//       {
//         url: 'https://qn-technology-store.vercel.app/thumbnail.PNG', 
//         width: 1200,
//         height: 630,
//         alt: 'QN Technology Store Banner',
//       },
//     ],
//     locale: 'vi_VN',
//     type: 'website',
//   },

//   // 3. Cấu hình Twitter (X)
//   twitter: {
//     card: 'summary_large_image',
//     title: 'QN Technology Store - Đồ công nghệ giá rẻ',
//     description: 'Mua đồ gaming online giá rẻ tại QN Technology Store.',
//     images: ['https://qn-technology-store.vercel.app/thumbnail.PNG'],
//   },
// };



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
