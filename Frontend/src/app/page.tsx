"use client";

import Banner from "#/components/UI/Banner";
import FlashSales from "#/components/UI/FlashSales";
import NewsSection from "#/components/UI/NewsSection";
import ServicesFeature from "#/components/UI/ServicesFeature";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Banner />
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary">Qn - shop</h1>
        <p className="text-gray-500">Mua - bán các sản phẩm công nghệ giá rẻ</p>
      </div>
      <ServicesFeature />
      <FlashSales targetDate="2026-12-30T22:01:59" />
      <NewsSection />
    </div>
  );
}
