"use client";

import Banner from "#/components/UI/Banner";
import FlashSales from "#/components/UI/FlashSales";
import NewsSection from "#/components/UI/NewsSection";
import ServicesFeature from "#/components/UI/ServicesFeature";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Banner />
      
      <FlashSales targetDate="2026-12-30T22:01:59" />
      <NewsSection />
      <ServicesFeature />
    </div>
  );
}
