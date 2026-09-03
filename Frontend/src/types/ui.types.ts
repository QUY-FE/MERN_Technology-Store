import { LucideIcon, ReactNode } from "react";

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
  keyword: string;
  setKeyword: (value: string) => void;
  placeholder?: string;
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
