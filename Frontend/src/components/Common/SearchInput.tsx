import { TiDelete } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({ value, onChange, placeholder, className }: SearchInputProps) {
  return (
    <div className={"relative w-full " + (className || "") }>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Tìm kiếm..."}
        className="w-full py-3 pl-6 mb-4 border rounded"
      />
      {value.length > 0 ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 cursor-pointer"
        >
          <TiDelete size={26} />
        </button>
      ) : (
        <span className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 flex items-center justify-center">
          <BiSearchAlt size={24} />
        </span>
      )}
    </div>
  );
}
