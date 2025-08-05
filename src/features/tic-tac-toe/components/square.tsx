import { SquareType } from "../types/game-types";

export default function Square({ value, onClick }: SquareType) {
  return (
    <button
      className="
        aspect-square flex items-center justify-center 
        text-4xl font-bold rounded-radius text-primary
        bg-card hover:bg-muted
        border-2 border-border
        transition-base
        focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-primary focus-visible:ring-offset-2
        ${value === 'X' ? 'text-primary' : 'text-destructive'}
        hover:scale-[1.02] active:scale-95 hover:cursor-pointer
      "
      onClick={onClick}
      aria-label={value ? `${value} square` : 'Empty square'}
    >
      {value}
    </button>
  );
}