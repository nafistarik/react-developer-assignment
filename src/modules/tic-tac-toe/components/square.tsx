import { SquareType } from "../types/game-types";

export default function Square({ value, onClick }: SquareType) {
  return (
    <button
      className={`
        aspect-square flex items-center justify-center 
        text-4xl font-bold rounded-lg 
        bg-white hover:bg-gray-50
        border-2 border-gray-200
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        ${value === "X" ? "text-primary" : "text-rose-600"}
        active:scale-95
      `}
      onClick={onClick}
      aria-label={value ? `${value} square` : "Empty square"}
    >
      {value}
    </button>
  );
}
