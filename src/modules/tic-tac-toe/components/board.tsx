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
    <div className="flex flex-col items-center gap-6 p-6 border border-border rounded-xl bg-card shadow-lg min-h-[calc(100vh-140px)]">
      <h1 className="text-2xl font-bold">Tic Tac Toe</h1>
      
      <div className="text-center">
        <p className="text-muted-foreground">
          {players.player1} (X) vs {players.player2} (O)
        </p>
        <p className="text-sm text-muted-foreground">
          Round: {match.round} | Score: {match.player1Wins}-{match.player2Wins}-{match.draws}
        </p>
      </div>

      <div className={`text-xl font-semibold ${
        match.matchOver ? "text-green-600" :
        winner ? "text-primary" :
        isBoardFull ? "text-muted-foreground" :
        isFirstPlayerTurn ? "text-primary" : "text-destructive"
      }`}>
        {getStatusMessage()}
      </div>

      <div className="grid grid-cols-3 gap-3 w-64 h-64">
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
          className="px-6 py-2 bg-primary text-white rounded-lg"
          onClick={() => dispatch(resetBoard())}
        >
          Next Round
        </button>
      )}
    </div>
  );
}