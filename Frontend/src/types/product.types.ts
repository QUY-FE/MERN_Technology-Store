export interface Product {
  _id: string;
  title: string;
  gallery?: string[];
  price: number;
  countStar: number;
  totalBuy: number;
  category: string;
  description: string;
  quantity: number;
  views: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateProductDto = {
  title: string;
  gallery?: string[];
  price: number;
  quantity: number;
  countStar: number;
  totalBuy: number;
  salePercent: number;
  category: string;
  description: string;
};

export type UpdateProductDto = Partial<CreateProductDto>;
