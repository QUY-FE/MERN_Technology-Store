"use client";
import { IconType } from "react-icons";
import { MdPhoneIphone } from "react-icons/md";
import { CiLaptop } from "react-icons/ci";
import { FaHeadphonesAlt } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import { IoGameControllerOutline } from "react-icons/io5";
import { FaComputer } from "react-icons/fa6";
import { TbHorseToy } from "react-icons/tb";
import Carousel from "react-multi-carousel";
import { CustomLeftArrow, CustomRightArrow } from "#/components/Button";
import { Package, Sparkles } from "lucide-react";

interface CategoryItem {
  href: string;
  title: string;
  icon: IconType;
}

const categoriesList: CategoryItem[] = [
  { href: "#", title: "All", icon: Package },
  { href: "#", title: "Phone", icon: MdPhoneIphone },
  { href: "#", title: "Laptop", icon: CiLaptop },
  { href: "#", title: "Headphone", icon: FaHeadphonesAlt },
  { href: "#", title: "Camera", icon: CiCamera },
  { href: "#", title: "Gaming", icon: IoGameControllerOutline },
  { href: "#", title: "Computer", icon: FaComputer },
  { href: "#", title: "Decor", icon: Sparkles },
];

interface Props {
  selectedCategory: string;
  onCategoryChange: (categoryTitle: string) => void;
}

export default function Categories({
  selectedCategory,
  onCategoryChange,
}: Props) {
  return (
    <section className="mt-4">
      <div className="max-w-[1200px]">
        <div className="w-full">
          <Carousel
            arrows
            additionalTransfrom={0}
            centerMode={false}
            containerClass="carousel-container"
            draggable
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            responsive={{
              desktop: { breakpoint: { max: 3000, min: 1200 }, items: 6 },
              tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
              mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
            }}
            rewind
            slidesToSlide={1}
            swipeable
            itemClass="px-4"
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {categoriesList.map((category, index) => (
              <article
                key={index}
                className={
                  selectedCategory === category.title
                    ? "categories_card_active"
                    : "categories_card_default"
                }
                onClick={() => onCategoryChange(category.title)}
                onDoubleClick={() => onCategoryChange("all")}
              >
                <div className="w-full h-2/3 ">
                  <category.icon
                    className="w-full h-full mx-auto pt-3"
                    size={80}
                  />
                </div>
                <div className="w-full h-1/3">
                  <h1 className="w-full h-full text-2xl font-semibold">
                    {category.title}
                  </h1>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
