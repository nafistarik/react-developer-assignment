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

  const isFormValid = player1.trim() !== "" && player2.trim() !== "";

  const handleSubmit = () => {
    dispatch(setPlayerNames({ player1, player2 }));
    router.push("/board");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen px-4">
      <div className="bg-card p-8 rounded-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">🎮 Start a New Match</h1>
          <p className="text-muted-foreground text-sm">
            Enter names for both players to begin
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="w-full border border-border px-4 py-2 rounded-md bg-background text-foreground focus:outline-none focus:ring focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Player 2 Name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="w-full border border-border px-4 py-2 rounded-md bg-background text-foreground focus:outline-none focus:ring focus:ring-primary"
          />

          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full px-4 py-2 rounded-md font-bold borderborder-border transition-base ${
              isFormValid
                ? "bg-primary text-white hover:bg-primary-hover hover:cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Start Match
          </button>
        </div>
      </div>
    </div>
  );
}
