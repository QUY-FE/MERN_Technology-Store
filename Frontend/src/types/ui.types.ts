import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface MenuItem {
  name: string;
  icon: LucideIcon;
  link: string;
}

export interface MenuListProps {
  items: MenuItem[];
}

export interface SocialItem {
  name: string;
  icon: ReactNode;
  link: string;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface CountDownTimeProps {
  targetDate: string;
}

export interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    gallery?: string[];
    price: number;
    countStar: number;
    category: string;
    createdAt: string;
  };
}

export interface SalesProps {
  title?: string;
  endDate?: string;
}
