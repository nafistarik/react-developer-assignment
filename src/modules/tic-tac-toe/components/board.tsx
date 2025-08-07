"use client";

import Square from "./square";
import { calculateWinner } from "../utils/calculate-winner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { makeMove, resetBoard } from "@/redux/features/boardSlice";
import {
  updateMatchResult,
  resetMatch,
} from "@/redux/features/matchSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Board() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const squares = useAppSelector((state) => state.board.squares);
  const isFirstPlayerTurn = useAppSelector((state) => state.board.isFirstPlayerTurn);

  const match = useAppSelector((state) => state.match);
  const player1 = useAppSelector((state) => state.player.player1);
  const player2 = useAppSelector((state) => state.player.player2);

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(Boolean);

  const [resultDispatched, setResultDispatched] = useState(false);

  // 🚨 If players not set, redirect to player setup
  useEffect(() => {
    if (!player1 || !player2) {
      router.push("/");
    }
  }, [player1, player2, router]);

  // ✅ Dispatch round result
  useEffect(() => {
    if (!resultDispatched && (winner || isBoardFull)) {
      if (winner === "X") {
        dispatch(updateMatchResult("player1"));
      } else if (winner === "O") {
        dispatch(updateMatchResult("player2"));
      } else {
        dispatch(updateMatchResult("draw"));
      }
      setResultDispatched(true);
    }
  }, [winner, isBoardFull, resultDispatched, dispatch]);

  // 🧠 Turn & Result Message
  const statusMessage = match.matchOver
    ? match.finalWinner === "draw"
      ? "🏁 Match Drawn!"
      : `🏁 ${match.finalWinner === "player1" ? player1 : player2} Wins the Match! 🎉`
    : winner
    ? `${winner === "X" ? player1 : player2} wins the round! 🎯`
    : isBoardFull
    ? "Round Drawn 🤝"
    : `${isFirstPlayerTurn ? player1 : player2}'s turn (${isFirstPlayerTurn ? "X" : "O"})`;

  // 🧼 Next Round or Reset Match
  const handleNext = () => {
    if (match.matchOver) {
      dispatch(resetMatch());
    } else {
      dispatch(resetBoard());
      setResultDispatched(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 border border-border rounded-xl">
      <h1 className="text-2xl font-bold text-center text-muted-foreground">
        🎮 Tic Tac Toe
      </h1>

      {/* 🧾 Match Info */}
      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>Round: {match.round} / 5</p>
        <p>
          {player1} (X) - {match.player1Wins} wins | {player2} (O) - {match.player2Wins} wins | Draws: {match.draws}
        </p>
      </div>

      {/* 🎯 Turn or Winner */}
      <div
        className={`text-xl font-semibold ${winner && "animate-pulse"} ${
          match.matchOver
            ? "text-green-600"
            : winner
            ? "text-primary"
            : isBoardFull
            ? "text-muted-foreground"
            : isFirstPlayerTurn
            ? "text-primary"
            : "text-destructive"
        }`}
      >
        {statusMessage}
      </div>

      {/* 🧩 Game Board */}
      <div className="grid grid-cols-3 gap-3 w-72 h-72">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => {
              if (!value && !winner && !match.matchOver) {
                dispatch(makeMove(index));
              }
            }}
          />
        ))}
      </div>

      {/* 🧪 Action Button */}
      {(winner || isBoardFull || match.matchOver) && (
        <button
          className="px-6 py-2 mt-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition"
          onClick={handleNext}
        >
          {match.matchOver ? "Reset Match" : "Next Round"}
        </button>
      )}
    </div>
  );
}
