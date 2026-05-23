"use client";

import Banner from "#/components/Banner";
import FlashSales from "#/components/FlashSales";
import NewsSection from "#/components/NewsSection";
import ServicesFeature from "#/components/ServicesFeature";

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
