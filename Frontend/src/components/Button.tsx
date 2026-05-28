import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full hover:scale-110 transition-transform duration-200 shadow-md"
  >
    <FaChevronLeft className="text-white text-xl" />
  </button>
);

export const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full hover:scale-110 transition-transform duration-200 shadow-md"
  >
    <FaChevronRight className="text-white text-xl" />
  </button>
);



