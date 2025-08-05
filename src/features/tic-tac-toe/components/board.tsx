"use client";
import { useState } from "react";
import Square from "./square";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const handleSquareClick = (index: number) => {
    const newSquares = [...squares];
    newSquares[index] = "X";
    setSquares(newSquares);
  };

  return (
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
  );
}
