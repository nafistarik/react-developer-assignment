import { SquareType } from "../types/game-types";

export default function Square({ value, onClick }: SquareType) {
  return (
    <button
      className="aspect-square w-20 flex items-center justify-center text-2xl font-bold bg-card text-primary
        border border-border rounded-radius hover:bg-transparent hover:cursor-pointer transition-all duration-200 ease-in-out"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
