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
  FaAppStoreIos,
} from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { MdLocationPin, MdMail, MdPhone, MdReportGmailerrorred } from "react-icons/md";

export default function Footer() {
  const FEATURES = [
    {
      icon: <FaHeadphonesAlt size={28} />,
      title: "Tư vấn 24/7",
      desc: "Hỗ trợ khách hàng mọi lúc",
    },
    {
      icon: <FaShippingFast size={28} />,
      title: "Vận chuyển nhanh",
      desc: "Giao hàng miễn phí toàn quốc",
    },
    {
      icon: <GoShieldCheck size={28} />,
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
    <footer className="w-full bg-white border-t border-gray-100">
      {/* === SECTION 1: FEATURES === */}
      {/* Thay vì dùng card nổi, tích hợp phẳng vào background trắng với divider tinh tế */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {FEATURES.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center px-4 group"
            >
              <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1 duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === SECTION 2: MAIN FOOTER === */}
      <div className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Cột 1: Giới thiệu */}
          <div className="space-y-6 text-center md:text-left">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text tracking-tight">
                Qn Shop
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Điểm đến lý tưởng cho các tín đồ công nghệ. Chúng tôi cam kết mang
              đến sản phẩm chính hãng, giá tốt nhất thị trường cùng dịch vụ hậu
              mãi tận tâm.
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              {SOCIAL_LINKS.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 text-gray-500 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-orange-200"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="text-center md:text-left">
            <h3 className="text-gray-900 text-base font-bold mb-6 uppercase tracking-wider">
              Về chúng tôi
            </h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600">
              <li>
                <Link
                  href="/about"
                  className="hover:text-orange-500 transition-colors"
                >
                  Giới thiệu Qn Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-orange-500 transition-colors"
                >
                  Sản phẩm
                </Link>
              </li>
              
              <li>
                <Link
                  href="/blog"
                  className="hover:text-orange-500 transition-colors"
                >
                  Tin tức công nghệ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms&policy"
                  className="hover:text-orange-500 transition-colors"
                >
                  Chính sách bảo mật <br /> & điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div className="text-center md:text-left">
            <h3 className="text-gray-900 text-base font-bold mb-6 uppercase tracking-wider">
              Hỗ trợ
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start justify-center md:justify-start gap-3">
                <MdLocationPin className="text-orange-500 text-xl shrink-0 mt-0.5" />
                <span className="leading-tight">
                  Số 47, Minh Khai
                  <br />
                  Hai Bà Trưng, Hà Nội
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MdMail className="text-orange-500 text-xl shrink-0" />
                <span>cskh.qnshop@gmail.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MdPhone className="text-orange-500 text-xl shrink-0" />
                <span className="font-bold text-gray-900 text-base">
                  1900 0000
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MdReportGmailerrorred className="text-orange-500 text-xl shrink-0" />
                <Link
                  href="/contact"
                >
                <span className="font-semibold hover:underline">
                  Liên hệ, Góp ý
                </span>
                  
                </Link>
              </li>
              <li>
              </li>
            </ul>
          </div>

          {/* Cột 4: Tải ứng dụng */}
          <div className="text-center md:text-left">
            <h3 className="text-gray-900 text-base font-bold mb-6 uppercase tracking-wider">
              Tải ứng dụng
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              Mua sắm tiện lợi hơn với ứng dụng Qn Shop
            </p>
            <div className="flex flex-col gap-3 max-w-[160px] mx-auto md:mx-0">
              <button className="flex items-center gap-3 bg-gray-900 px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-all shadow-md hover:shadow-lg">
                <FaAppStoreIos size={26} className="text-white" />
                <div className="text-left">
                  <p className="text-[10px] uppercase text-gray-300 font-medium tracking-wide">
                    Download on the
                  </p>
                  <p className="text-sm font-semibold text-white leading-none mt-0.5">
                    App Store
                  </p>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-gray-900 px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-all shadow-md hover:shadow-lg">
                <FaGooglePlay size={24} className="text-white" />
                <div className="text-left">
                  <p className="text-[10px] uppercase text-gray-300 font-medium tracking-wide">
                    Get it on
                  </p>
                  <p className="text-sm font-semibold text-white leading-none mt-0.5">
                    Google Play
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-6 border-t border-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Qn Shop. All rights reserved.</p>
          <p>
            Made by{" "}
            <Link
              href="https://github.com/QUY-FE"
              target="_blank"
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              Quý Nguyễn
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
