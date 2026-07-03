import { TiDelete } from "react-icons/ti";

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
        className="w-full py-3 pl-6 border rounded"
      />
      {value.length > 0 ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-1 right-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 cursor-pointer"
        >
          <TiDelete size={26} />
        </button>
      ) : null}
    </div>
  );
}
