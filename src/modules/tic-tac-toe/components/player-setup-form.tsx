"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setPlayerNames } from "@/redux/features/playerSlice";

export default function PlayerSetupForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleSubmit = () => {
    if (player1.trim() && player2.trim()) {
      dispatch(setPlayerNames({ player1, player2 }));
      router.push("/board");
    }
  };

  return (
<div className="flex items-center justify-center px-4 py-8 min-h-[calc(100vh-140px)] bg-[var(--background)]">
      <div className="bg-[var(--card)] p-8 rounded-2xl shadow-xl max-w-md w-full border border-[var(--border)]">
        <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">
          🎯 Player Setup
        </h1>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--foreground)]">
              Player 1 <span className="text-[var(--primary)]">(X)</span>
            </label>
            <input
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--foreground)]">
              Player 2 <span className="text-[var(--destructive)]">(O)</span>
            </label>
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--destructive)] transition-all"
              placeholder="Enter name"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!player1.trim() || !player2.trim()}
            className={`w-full py-3 rounded-lg font-bold tracking-wide transition-all ${
              player1.trim() && player2.trim()
                ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
                : "bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed"
            }`}
          >
            🚀 Start Game
          </button>
        </div>
      </div>
    </div>
  );
}