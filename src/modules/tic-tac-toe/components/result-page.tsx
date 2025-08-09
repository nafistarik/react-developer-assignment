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
    <div className="flex items-center justify-center px-4 py-8 min-h-[calc(100vh-140px)] bg-[var(--background)]">
      <div className="bg-[var(--card)] p-8 rounded-3xl shadow-xl max-w-md w-full border border-[var(--border)]">
        <h1 className="text-4xl font-extrabold text-center mb-8 select-none">
          {match.finalWinner === "draw"
            ? "🤝 Match Drawn!"
            : `🎉 ${players[match.finalWinner || "player1"]} Wins!`}
        </h1>

        <div className="mb-10">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-[var(--primary)]/20 p-4 rounded-xl text-center">
              <h3 className="font-bold text-[var(--primary)]">
                {players.player1}
              </h3>
              <p className="text-3xl font-semibold">{match.player1Wins}</p>
            </div>
            <div className="bg-[var(--muted)] p-4 rounded-xl text-center">
              <h3 className="font-bold text-[var(--muted-foreground)]">
                Draws
              </h3>
              <p className="text-3xl font-semibold">{match.draws}</p>
            </div>
            <div className="bg-[var(--destructive)]/20 p-4 rounded-xl text-center">
              <h3 className="font-bold text-[var(--destructive)]">
                {players.player2}
              </h3>
              <p className="text-3xl font-semibold">{match.player2Wins}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-[var(--muted-foreground)] select-none">
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

        <div className="flex gap-4 w-full">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-semibold tracking-wide hover:bg-[var(--primary-hover)] transition-colors flex-1 select-none"
          >
            Play Again
          </button>
          <button
            onClick={handleNewMatch}
            className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-xl font-semibold hover:opacity-90 transition-opacity flex-1 select-none"
          >
            New Match
          </button>
        </div>

        <div className="mt-6 w-full">
          <Link
            href="/leaderboard"
            className="block px-6 py-3 text-center text-[var(--primary)] bg-transparent border border-[var(--primary)] rounded-xl hover:bg-[var(--primary)]/10 transition-colors select-none"
          >
            View Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
