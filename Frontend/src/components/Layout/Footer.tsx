import {
  Box,
  Clock,
  Info,
  LucideIcon,
  Mail,
  MapPin,
  MessageCircleQuestionMark,
  Phone,
  PhoneCall,
  ShoppingCart,
  User,
  
} from "lucide-react";

import Link from "next/link";
import { JSX, type ReactNode } from "react";

import { FaFacebook, FaTiktok } from "react-icons/fa";

interface MenuItem {
  name: string;
  icon: LucideIcon;
  link: string;
}

interface MenuListProps {
  items: MenuItem[];
}

interface SocialItem {
  name: string;
  icon: ReactNode;
  link: string;
}

const socialArr: SocialItem[] = [
  {
    name: "Facebook",
    icon: <FaFacebook size={20} color="#0866ff" />,
    link: "https://www.facebook.com",
  },
  {
    name: "TikTok",
    icon: <FaTiktok size={16} color="#000000" />,
    link: "https://www.tiktok.com",
  },
];

const serviceArr: MenuItem[] = [
  { name: "Sản phẩm", icon: Box, link: "/products" },
  { name: "Tin tức", icon: Clock, link: "/blog" },
  { name: "Giỏ hàng", icon: ShoppingCart, link: "/cart" },
  { name: "Giới thiệu", icon: Info, link: "/about" },
  
];

const supportArr: MenuItem[] = [
  { name: "Hồ sơ", icon: User, link: "/profile" },
  { name: "Liên hệ", icon: Phone, link: "/contact" },
  { name: "Câu hỏi thường gặp", icon: MessageCircleQuestionMark, link: "/question" },
  { name: "Điều khoản & Chính sách", icon: MessageCircleQuestionMark, link: "/terms&policy" },
];

function MenuList({ items }: MenuListProps): JSX.Element {
  return (
    <ul className="space-y-4 text-sm">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <li key={item.name}>
            <Link
              href={item.link}
              className="flex items-center gap-2 transition-all hover:text-primary"
            >
              <Icon size={16} />
              <span>{item.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Footer(): JSX.Element {
  return (
    <footer className="mt-10 text-grayNormal border-t-[1px] border-grayLow pt-10 ">
      <div className="mx-auto max-w-7xl px-4 lg:px-0">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div className="space-y-6">
            <p className="text-justify text-sm leading-relaxed">
              <span className="font-magistral text-primary">
                QN.PC
              </span>{" "}
              cung cấp các đồ công nghệ giá rẻ
            </p>
          </div>

          <div>
            <h5 className="mb-6 font-bold text-primary">Dịch vụ</h5>
            <MenuList items={serviceArr} />
          </div>

          <div>
            <h5 className="mb-6 font-bold text-primary">Hỗ trợ khách hàng</h5>
            <MenuList items={supportArr} />
          </div>

          <div>
            <h5 className="mb-6 font-bold text-primary">Liên hệ</h5>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 text-primary" />
                <span>
                  Số 123, Bà Triệu, phường Vĩnh Trại, TP. Lạng Sơn
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-primary" />
                <span>qn.pc@cskh.com</span>
              </li>

              <li className="flex items-center gap-3">
                <PhoneCall size={20} className="shrink-0 text-primary" />
                <span>1900 0000</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-xl flex-col-reverse items-center gap-4 border-t py-2 text-center text-xs text-grayMedium sm:flex-row sm:justify-between">
        <p>
          &copy; 2026{" "}
          <span className="font-magistral text-primary">Quý Nguyễn</span>.
          All Rights Reserved
        </p>

        <div className="flex items-center gap-2">
          <p>Theo dõi thêm tại: </p>

          {socialArr.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              target="_blank"
              aria-label={item.name}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-105 hover:bg-grayLow"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
