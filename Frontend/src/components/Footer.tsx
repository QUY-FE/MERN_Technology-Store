"use client";
import Link from "next/link";

// Icons
import {
  FaHeadphonesAlt,
  FaShippingFast,
  FaFacebookSquare,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaGooglePlay,
  FaAppStoreIos
} from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { MdLocationPin, MdMail, MdPhone } from "react-icons/md";

// Assets (Giả sử bạn có ảnh logo)
// import qrAppURL from "#/assets/images/QR.jpg"; 

export default function Footer() {

  // 1. Config Data - Dễ dàng chỉnh sửa sau này
  const FEATURES = [
    {
      icon: <FaHeadphonesAlt size={24} />,
      title: "Tư vấn 24/7",
      desc: "Hỗ trợ khách hàng mọi lúc",
    },
    {
      icon: <FaShippingFast size={24} />,
      title: "Vận chuyển nhanh",
      desc: "Giao hàng miễn phí toàn quốc",
    },
    {
      icon: <GoShieldCheck size={24} />,
      title: "Bảo hành uy tín",
      desc: "Đổi trả trong vòng 15 ngày",
    },
  ];

  const SOCIAL_LINKS = [
    { icon: <FaFacebookSquare size={20} />, href: "https://facebook.com" },
    { icon: <FaInstagram size={20} />, href: "https://instagram.com" },
    { icon: <FaTiktok size={20} />, href: "https://tiktok.com" },
    { icon: <FaTwitter size={20} />, href: "https://twitter.com" },
  ];

  return (
    <footer className="w-full bg-white pt-10">
      {/* === SECTION 1: FEATURES (Dải tiện ích) === */}
      <div className="container mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
          {FEATURES.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center p-2">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === SECTION 2: MAIN FOOTER === */}
      <div className="bg-[#24272e] text-gray-300 py-12 border-t border-gray-700">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Cột 1: Giới thiệu */}
          <div className="space-y-4 text-center md:text-left">
            <Link href="/" className="inline-block">
               <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
                  Qn Shop
               </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Qn Shop là điểm đến lý tưởng cho các tín đồ công nghệ. Chúng tôi cam kết mang đến sản phẩm chính hãng, giá tốt nhất thị trường cùng dịch vụ hậu mãi tận tâm.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              {SOCIAL_LINKS.map((social, idx) => (
                <Link 
                  key={idx} 
                  href={social.href} 
                  target="_blank"
                  className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wide">Về chúng tôi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-orange-500 transition">Giới thiệu Qn Shop</Link></li>
              <li><Link href="/terms&policy" className="hover:text-orange-500 transition">Chính sách bảo mật và điều khoản sử dụng</Link></li>
              <li><Link href="/blog" className="hover:text-orange-500 transition">Tin tức công nghệ</Link></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wide">Hỗ trợ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MdLocationPin className="text-orange-500 text-lg shrink-0" />
                <span>Số 47, Minh Khai, Hà Nội</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MdMail className="text-orange-500 text-lg shrink-0" />
                <span>cskh.qnshop@gmail.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MdPhone className="text-orange-500 text-lg shrink-0" />
                <span className="font-bold text-white text-base">1900 xxxx</span>
              </li>
            </ul>
          </div>

          {/* Cột 4: Tải ứng dụng */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wide">Tải ứng dụng</h3>
            <p className="text-xs text-gray-400 mb-4">Mua sắm tiện lợi hơn với ứng dụng Qn Shop</p>
            <div className="flex flex-col gap-3 max-w-[180px] mx-auto md:mx-0">
               {/* Giả lập nút download App */}
               <button className="flex items-center gap-3 bg-gray-800 border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                  <FaAppStoreIos size={24} className="text-white"/>
                  <div className="text-left">
                     <p className="text-[10px] uppercase text-gray-400">Download on the</p>
                     <p className="text-sm font-bold text-white leading-none">App Store</p>
                  </div>
               </button>
               <button className="flex items-center gap-3 bg-gray-800 border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                  <FaGooglePlay size={22} className="text-white"/>
                  <div className="text-left">
                     <p className="text-[10px] uppercase text-gray-400">Get it on</p>
                     <p className="text-sm font-bold text-white leading-none">Google Play</p>
                  </div>
               </button>
            </div>
          </div>

        </div>
      </div>

      {/* === SECTION 3: COPYRIGHT === */}
      <div className="bg-[#1e2026] py-4 border-t border-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Qn Shop. All rights reserved.</p>
          <p>
            Make by <Link href="https://github.com/QUY-FE" target="_blank" className="text-orange-500 hover:underline">Quý Nguyễn</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}