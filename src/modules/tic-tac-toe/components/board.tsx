"use client";

import Square from "./square";
import { calculateWinner } from "../utils/calculate-winner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { makeMove, resetBoard } from "@/redux/features/boardSlice";
import { recordRoundResult } from "@/redux/features/matchSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Board() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const squares = useAppSelector((state) => state.board.squares);
  const isFirstPlayerTurn = useAppSelector((state) => state.board.isFirstPlayerTurn);
  const match = useAppSelector((state) => state.match);
  const players = useAppSelector((state) => state.player);

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(Boolean);

  // Handle round completion
  useEffect(() => {
    if (winner || isBoardFull) {
      const result = winner 
        ? winner === "X" ? "player1" : "player2"
        : "draw";
      
      dispatch(recordRoundResult({
        winner: result,
        squares: [...squares]
      }));
    }
  }, [winner, isBoardFull, squares, dispatch]);

  // Redirect to result page when match is over
  useEffect(() => {
    if (match.matchOver) {
      router.push("/result");
    }
  }, [match.matchOver, router]);

  const getStatusMessage = () => {
    if (match.matchOver) return "Match completed!";
    
    const lastRound = match.history[match.history.length - 1];
    if (lastRound) {
      return lastRound.winner === "draw"
        ? `Round ${lastRound.round} was a draw!`
        : `${players[lastRound.winner]} won round ${lastRound.round}!`;
    }
    
    return `${isFirstPlayerTurn ? players.player1 : players.player2}'s turn (${isFirstPlayerTurn ? "X" : "O"})`;
  };

  const handleSquareClick = (index: number) => {
    if (!squares[index] && !winner && !match.matchOver) {
      dispatch(makeMove(index));
    }
  };

  return (
 <div className="flex flex-col items-center gap-8 p-8 border border-[var(--border)] rounded-3xl bg-[var(--card)] shadow-xl min-h-[calc(100vh-140px)] max-w-md mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] select-none">Tic Tac Toe</h1>
      
      <div className="text-center">
        <p className="text-[var(--muted-foreground)] font-semibold">
          {players.player1} <span className="text-[var(--primary)]">(X)</span> vs {players.player2} <span className="text-[var(--destructive)]">(O)</span>
        </p>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Round: {match.round} | Score: {match.player1Wins}-{match.player2Wins}-{match.draws}
        </p>
      </div>

      <div className={`text-xl font-semibold select-none ${
        match.matchOver ? "text-[var(--primary)]" :
        winner ? "text-[var(--primary)]" :
        isBoardFull ? "text-[var(--muted-foreground)]" :
        isFirstPlayerTurn ? "text-[var(--primary)]" : "text-[var(--destructive)]"
      }`}>
        {getStatusMessage()}
      </div>

      <div className="grid grid-cols-3 gap-4 w-72 h-72">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleSquareClick(index)}
          />
        ))}
      </div>

      {(winner || isBoardFull) && !match.matchOver && (
        <button
          className="px-8 py-3 bg-[var(--primary)] text-white rounded-xl font-semibold tracking-wide hover:bg-[var(--primary-hover)] transition-colors select-none"
          onClick={() => dispatch(resetBoard())}
        >
          Next Round
        </button>
      )}
    </div>
  );
}