"use client";
import { useState } from "react";
import Square from "./square";
import { calculateWinner } from "../utils/calculate-winner";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState(true);
  const winner = calculateWinner(squares);
  const status = winner
    ? winner === "X"
      ? "1st Player Wins! 🎉"
      : "2nd Player Wins! 🎉"
    : isFirstPlayerTurn
    ? "1st Player turn:"
    : "2nd Player turn:";
  const handleSquareClick = (index: number) => {
    if (squares[index] || winner) return;
    const newSquares = [...squares];
    newSquares[index] = isFirstPlayerTurn ? "X" : "O";
    setSquares(newSquares);
    setIsFirstPlayerTurn(!isFirstPlayerTurn);
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-6 border border-muted rounded-lg">
      <h1 className="text-primary font-bold text-2xl">{status}</h1>
      <div className="grid grid-cols-3 gap-3 w-64 h-64">
        {squares.map((value, index) => {
          return (
            <Square
              key={index}
              value={value}
              onClick={() => handleSquareClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
