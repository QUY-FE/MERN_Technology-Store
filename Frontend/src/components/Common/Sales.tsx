"use client";

import Link from "next/link";
import { JSX } from "react";

interface SalesProps {
  hasSales?: boolean;
  totalSales?: number;
  titleSales?: string;
}

export default function Sales({
  hasSales = false,
  totalSales = 0,
  titleSales = "",
}: SalesProps): JSX.Element {
  if (!hasSales) {
    return <></>;
  }

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex min-h-[40px] max-w-7xl flex-col items-center justify-center px-4 py-2 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="text-[11px] leading-5 text-gray-700 sm:text-sm md:text-base">
          {titleSales} - Giảm {totalSales}%!
          <Link
            href="/products"
            className="ml-2 inline-block font-semibold text-primary underline transition hover:font-bold"
          >
            Mua ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
