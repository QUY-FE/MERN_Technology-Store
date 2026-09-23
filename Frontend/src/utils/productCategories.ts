export const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  Phone: "Điện thoại",
  Laptop: "Laptop",
  Headphone: "Tai nghe",
  Camera: "Máy ảnh",
  Gaming: "Gaming",
  Computer: "Máy tính bàn",
  Decor: "Đồ Decor",
};

export function normalizeProductCategory(value: string | null | undefined) {
  if (!value) return null;

  return (
    Object.keys(PRODUCT_CATEGORY_LABELS).find(
      (category) => category.toLowerCase() === value.toLowerCase(),
    ) ?? null
  );
}

export function productCategoryHref(category: string) {
  return `/products?category=${encodeURIComponent(category)}`;
}
