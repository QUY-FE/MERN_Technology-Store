"use client";

import Link from "next/link";

export default function Sales({
  hasSales = false,
  totalSales = 0,
  titleSales = "",
}: {
  hasSales?: boolean;
  totalSales?: number;
  titleSales?: string;
}) {
  return (
    <div>
      {hasSales ? (
        <div className="w-full h-[36px] bg-black">
          <p className="text-white block w-full h-full text-center leading-[36px] text-[13px]">
            {titleSales} - Giảm {totalSales}%!
            <span className="font-bold underline ml-3">
              <Link href="/products">Mua ngay</Link>
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
