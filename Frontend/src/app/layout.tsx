import "react-multi-carousel/lib/styles.css";
import "#/assets/css/globals.css";
import 'react-loading-skeleton/dist/skeleton.css'
import { Archivo } from "next/font/google";
import WrapperClient from "./WrapperClient";

const geistArchivo = Archivo({
  variable: "--font-geist-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: 'QN Technology Store - Đồ công nghệ giá rẻ',
  description: 'Săn sale đồ gaming hot, giảm giá lên đến 50% tại QN Technology Store.',
  
  openGraph: {
    title: 'QN Technology Store - Đồ công nghệ giá rẻ',
    description: 'Mua đồ gaming online giá rẻ, giao hàng nhanh toàn quốc.',
    url: 'https://qn-technology-store.vercel.app',
    siteName: 'QN Technology Store',
    images: [
      {
        url: 'https://qn-technology-store.vercel.app/thumbnail.PNG', 
        width: 1200,
        height: 630,
        alt: 'QN Technology Store Banner',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },

  
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
