'use client'

import Banner from "#/components/Banner";
import FlashSales from "#/components/FlashSales";
import NewsSection from "#/components/NewsSection";


export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Banner />
      <FlashSales targetDate="2026-12-30T22:01:59" />
      <NewsSection />

      
    </div>
  );
}
