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
    <div className="flex items-center justify-center p-4  min-h-[calc(100vh-140px)]">
      <div className="bg-card p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Player Setup</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Player 1 (X)</label>
            <input
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg"
              placeholder="Enter name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Player 2 (O)</label>
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg"
              placeholder="Enter name"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!player1.trim() || !player2.trim()}
            className={`w-full py-2 rounded-lg font-bold ${
              player1.trim() && player2.trim()
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}