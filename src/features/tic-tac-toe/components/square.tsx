import { SquareType } from "../types/game-types";

export default function Square({ value, onClick }: SquareType) {
  return (
    <button
      className="aspect-square flex items-center justify-center text-2xl font-bold bg-card text-primary
        border-2 border-border rounded-radius hover:bg-transparent hover:cursor-pointer transition-base"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
