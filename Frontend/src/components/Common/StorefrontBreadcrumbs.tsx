"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useGetOneProductQuery } from "#/redux/features/productApi";
import { useGetOneNewsQuery } from "#/redux/features/newsApi";
import { blogDetailPosts } from "#/data/blogPosts";
import {
  normalizeProductCategory,
  PRODUCT_CATEGORY_LABELS,
  productCategoryHref,
} from "#/utils/productCategories";

const SITE_ORIGIN = "https://qn-technology-store.vercel.app";
const HIDDEN_PATHS = new Set(["/"]);

type BreadcrumbItem = { label: string; href: string };

const home: BreadcrumbItem = { label: "Trang chủ", href: "/" };

const staticPages: Record<string, BreadcrumbItem[]> = {
  "/about": [{ label: "Giới thiệu", href: "/about" }],
  "/contact": [{ label: "Liên hệ", href: "/contact" }],
  "/products": [{ label: "Sản phẩm", href: "/products" }],
  "/news": [{ label: "Tin tức", href: "/news" }],
  "/blog": [{ label: "Blog", href: "/blog" }],
  "/cart": [{ label: "Giỏ hàng", href: "/cart" }],
  "/products/checkout": [
    { label: "Giỏ hàng", href: "/cart" },
    { label: "Thanh toán", href: "/products/checkout" },
  ],
  "/profile": [{ label: "Tài khoản", href: "/profile" }],
  "/orders": [
    { label: "Tài khoản", href: "/profile" },
    { label: "Đơn hàng", href: "/orders" },
  ],
  "/notifications": [
    { label: "Tài khoản", href: "/profile" },
    { label: "Thông báo", href: "/notifications" },
  ],
  "/terms&policy": [
    { label: "Điều khoản và chính sách", href: "/terms&policy" },
  ],
};

function absoluteUrl(href: string) {
  return new URL(href, SITE_ORIGIN).toString();
}

export default function StorefrontBreadcrumbs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const segments = pathname.split("/").filter(Boolean);
  const productId =
    segments[0] === "products" &&
    segments.length === 2 &&
    segments[1] !== "checkout"
      ? segments[1]
      : null;
  const newsId =
    segments[0] === "news" && segments.length === 2 ? segments[1] : null;
  const { data: product } = useGetOneProductQuery(productId ?? "", {
    skip: !productId,
  });
  const { data: news } = useGetOneNewsQuery(newsId ?? "", {
    skip: !newsId,
  });

  if (pathname === "/admin" || pathname.startsWith("/admin/")) return null;

  const category =
    pathname === "/products"
      ? normalizeProductCategory(searchParams.get("category"))
      : null;
  const canonicalPath = category ? productCategoryHref(category) : pathname;
  const canonical = <link rel="canonical" href={absoluteUrl(canonicalPath)} />;

  if (HIDDEN_PATHS.has(pathname)) return canonical;

  let items: BreadcrumbItem[] | null = staticPages[pathname] ?? null;

  if (pathname === "/products" && category) {
    items = [
      ...staticPages["/products"],
      {
        label: PRODUCT_CATEGORY_LABELS[category],
        href: productCategoryHref(category),
      },
    ];
  } else if (productId && product) {
    const productCategory = normalizeProductCategory(product.category);
    items = [
      ...staticPages["/products"],
      ...(productCategory
        ? [
            {
              label: PRODUCT_CATEGORY_LABELS[productCategory],
              href: productCategoryHref(productCategory),
            },
          ]
        : []),
      { label: product.title, href: pathname },
    ];
  } else if (newsId && news) {
    items = [
      ...staticPages["/news"],
      { label: news.title, href: pathname },
    ];
  } else if (segments[0] === "blog" && segments.length === 2) {
    const post = blogDetailPosts.find((item) => item.slug === segments[1]);
    if (post) {
      items = [
        ...staticPages["/blog"],
        { label: post.title, href: pathname },
      ];
    }
  }

  if (!items) return canonical;

  const trail = [home, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };

  return (
    <>
      {canonical}
      <nav aria-label="Đường dẫn trang" className="mx-auto w-full max-w-[1200px] px-4 py-3 text-sm text-gray-600">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((item, index) => {
            const isCurrent = index === trail.length - 1;
            return (
              <li key={item.href} className="flex min-w-0 items-center gap-2">
                {index > 0 && <span aria-hidden="true" className="text-gray-400">›</span>}
                {isCurrent ? (
                  <span aria-current="page" className="min-w-0 break-words font-medium text-gray-900">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="min-w-0 hover:text-primary hover:underline focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
