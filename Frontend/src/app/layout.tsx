import "react-multi-carousel/lib/styles.css";
import "#/assets/css/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Archivo } from "next/font/google";
import WrapperClient from "./WrapperClient";
import "swiper/css";
import "swiper/css/pagination";
const geistArchivo = Archivo({
  variable: "--font-geist-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "QN Shop | Mua/bán đồ công nghệ giá rẻ  ",
  description:
    "Chuyên cung cấp các sản phẩm công nghệ như: PC,Laptop,Gaming Gear,Đồ Decor cho góc gaming của bạn",
  keywords: ["qn", "qn shop", "PC", "Laptop", "Gaming", "Gear"],

  openGraph: {
    title: "Mua/bán đồ công nghệ giá rẻ | QN Shop",
    description:
      "Chuyên cung cấp các sản phẩm công nghệ như: PC,Laptop,Gaming Gear,Đồ Decor cho góc gaming của bạn",
    url: "https://qn-technology-store.vercel.app",
    siteName: "QN Shop",
    images: [
      {
        url: "https://qn-technology-store.vercel.app/thumbnail.PNG",
        width: 1200,
        height: 630,
        alt: "QN Technology Store Banner",
      },
    ],
    locale: "vi_VN",
    phoneNumbers: "0869498816",
    emails: "quysamp205@gmail.com",
    type: "website",
    contryName: "Việt Nam",
  },
  alternates: {
    canonical: "https://qn-technology-store.vercel.app",
  },

  metadateBase: "https://qn-technology-store.vercel.app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${geistArchivo.variable} antialiased relative`}>
        <WrapperClient>{children}</WrapperClient>
      </body>
    </html>
  );
}
