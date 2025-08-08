"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetMatch } from "@/redux/features/matchSlice";
import { resetBoard } from "@/redux/features/boardSlice";
import { addMatchResult } from "@/redux/features/leaderboardSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function ResultPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const match = useAppSelector((state) => state.match);
  const players = useAppSelector((state) => state.player);

  // Update leaderboard when the component mounts
  useEffect(() => {
    if (match.matchOver) {
      dispatch(
        addMatchResult({
          player1: players.player1,
          player2: players.player2,
          player1Wins: match.player1Wins,
          player2Wins: match.player2Wins,
          draws: match.draws,
          finalWinner: match.finalWinner,
        })
      );
    }
  }, [dispatch, match, players]);

  const handleRestart = () => {
    dispatch(resetBoard());
    dispatch(resetMatch());
    router.push("/board");
  };

  const handleNewMatch = () => {
    dispatch(resetBoard());
    dispatch(resetMatch());
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center  min-h-[calc(100vh-140px)]">
      <div className="bg-card p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          {match.finalWinner === "draw"
            ? "🤝 Match Drawn!"
            : `🎉 ${players[match.finalWinner || "player1"]} Wins!`}
        </h1>

        <div className="mb-8">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg text-center">
              <h3 className="font-bold">{players.player1}</h3>
              <p className="text-primary text-xl">{match.player1Wins}</p>
            </div>
            <div className="bg-muted p-3 rounded-lg text-center">
              <h3 className="font-bold">Draws</h3>
              <p className="text-xl">{match.draws}</p>
            </div>
            <div className="bg-destructive/10 p-3 rounded-lg text-center">
              <h3 className="font-bold">{players.player2}</h3>
              <p className="text-destructive text-xl">{match.player2Wins}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Total rounds played: {match.round}</p>
            {match.history.map((round, index) => (
              <p key={index}>
                Round {round.round}:{" "}
                {round.winner === "draw"
                  ? "Draw"
                  : `${players[round.winner]} won`}
              </p>
            ))}
          </div>
        </div>

        <div className="flex gap-4 w-full pb-4">
          <button
            onClick={handleRestart}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex-1"
          >
            Play Again
          </button>
          <button
            onClick={handleNewMatch}
            className="px-6 py-2 bg-foreground text-background rounded-lg hover:opacity-90 flex-1"
          >
            New Match
          </button>
        </div>

        <div className="w-full">
          <Link
            href="/leaderboard"
            className="px-6 py-2 text-center text-primary bg-transparent border border-primary rounded-lg hover:bg-primary/10 w-[100%]"
          >
            View Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
