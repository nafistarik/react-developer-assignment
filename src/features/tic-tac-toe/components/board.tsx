"use client";
import { useState } from "react";
import Square from "./square";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState(true);
  const handleSquareClick = (index: number) => {
    if (squares[index]) return;
    const newSquares = [...squares];
    if (isFirstPlayerTurn) {
      newSquares[index] = "X";
    } else {
      newSquares[index] = "O";
    }
    setSquares(newSquares);
    setIsFirstPlayerTurn(!isFirstPlayerTurn);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-primary font-bold text-2xl">
        {isFirstPlayerTurn ? "1st " : "2nd "}Player turn:
      </h1>
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
