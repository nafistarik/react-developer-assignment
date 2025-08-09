import { SquareType } from "../types/game-types";

export default function Square({ value, onClick }: SquareType) {
  return (
    <button
      className={`
        aspect-square flex items-center justify-center 
        text-5xl font-extrabold rounded-xl 
        bg-[var(--background)] hover:bg-[var(--muted)] 
        border-4 border-[var(--border)] 
        transition-transform duration-150
        focus-visible:outline-none focus-visible:ring-4 
        focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2
        ${value === "X" ? "text-[var(--primary)]" : "text-[var(--destructive)]"}
        active:scale-90
      `}
      onClick={onClick}
      aria-label={value ? `${value} square` : "Empty square"}
    >
      {value}
    </button>
  );
}
