const getImageUrl = (img?: string) => {
  if (!img) return "/not_found.png";
  if (img.startsWith("http")) return img;
  const imagePath = img.startsWith("/") ? img : `/${img}`;
  return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${imagePath}`;
};

export default getImageUrl;