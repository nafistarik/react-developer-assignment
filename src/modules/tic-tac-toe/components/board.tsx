"use client";

import Square from "./square";
import { calculateWinner } from "../utils/calculate-winner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { makeMove, resetBoard } from "@/redux/features/boardSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Board() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const squares = useAppSelector((state) => state.board.squares);
  const isFirstPlayerTurn = useAppSelector(
    (state) => state.board.isFirstPlayerTurn
  );

  const player1 = useAppSelector((state) => state.player.player1);
  const player2 = useAppSelector((state) => state.player.player2);

  useEffect(() => {
    if (!player1 || !player2) {
      router.push("/");
    }
  }, [player1, player2, router]);

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(Boolean);

  const status = winner
    ? winner === "X"
      ? `${player1} Wins! 🎉`
      : `${player2} Wins! 🎉`
    : isBoardFull
    ? "It's a Draw! 🤝"
    : isFirstPlayerTurn
    ? `${player1}'s turn (X)`
    : `${player2}'s turn (O)`;

  return (
    <div className="flex flex-col items-center gap-6 p-6 border border-border rounded-xl">
      <h1 className="text-2xl font-bold text-center">
        <span className="text-muted-foreground">🎮 Tic Tac Toe</span>
        <div
          className={`mt-2 text-xl ${winner && " animate-pulse"} ${
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

      <div className="grid grid-cols-3 gap-3 w-72 h-72">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => {
              if (!value && !winner) {
                dispatch(makeMove(index));
              }
            }}
          />
        ))}
      </div>

      {(winner || isBoardFull) && (
        <button
          className="
            px-6 py-2 bg-primary text-primary-foreground 
            rounded-lg font-bold hover:bg-primary-hover hover:cursor-pointer
            transition-base shadow-md focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-primary focus-visible:ring-offset-2
          "
          onClick={() => {
            dispatch(resetBoard());
          }}
        >
          Play Again
        </button>
      )}
    </div>
  );
}
