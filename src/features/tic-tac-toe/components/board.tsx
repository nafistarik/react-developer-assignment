"use client";
import { useState } from "react";
import Square from "./square";
import { calculateWinner } from "../utils/calculate-winner";

export default function Board() {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState(true);

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(Boolean);

  const status = winner
    ? winner === "X"
      ? "1st Player Wins! 🎉"
      : "2nd Player Wins! 🎉"
    : isBoardFull
    ? "It's a Draw! 🤝"
    : isFirstPlayerTurn
    ? "1st Player's turn (X)"
    : "2nd Player's turn (O)";

  const handleSquareClick = (index: number) => {
    if (squares[index] || winner) return;
    const newSquares = [...squares];
    newSquares[index] = isFirstPlayerTurn ? "X" : "O";
    setSquares(newSquares);
    setIsFirstPlayerTurn(!isFirstPlayerTurn);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-popover border border-border rounded-xl">
      <h1 className="text-2xl font-bold text-center">
        <span className="text-muted-foreground">Tic Tac Toe</span>
        <div
          className={`mt-2 text-2xl ${winner && " animate-pulse"} ${
            winner
              ? winner === "X"
                ? "text-primary"
                : "text-destructive"
              : isBoardFull
              ? "text-muted-foreground"
              : isFirstPlayerTurn
              ? "text-primary"
              : "text-destructive"
          }`}
        >
          {status}
        </div>
      </h1>

      <div className="grid grid-cols-3 gap-3 w-64 h-64">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleSquareClick(index)}
          />
        ))}
      </div>

      {(winner || isBoardFull) && (
        <button
          className="
            px-6 py-3 bg-primary text-primary-foreground 
            rounded-radius font-bold hover:bg-primary-hover hover:cursor-pointer
            transition-base shadow-md hover:shadow-lg
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-primary focus-visible:ring-offset-2
          "
          onClick={() => {
            setSquares(Array(9).fill(null));
            setIsFirstPlayerTurn(true);
          }}
        >
          Play Again
        </button>
      )}
    </div>
  );
}
