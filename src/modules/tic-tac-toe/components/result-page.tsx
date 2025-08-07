"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetMatch } from "@/redux/features/matchSlice";
import { resetBoard } from "@/redux/features/boardSlice";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const match = useAppSelector((state) => state.match);
  const players = useAppSelector((state) => state.player);

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-card p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          {match.finalWinner === "draw" ? "🤝 Match Drawn!" : 
           `🎉 ${players[match.finalWinner || "player1"]} Wins!`}
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
                Round {round.round}: {round.winner === "draw" ? "Draw" : 
                `${players[round.winner]} won`}
              </p>
            ))}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRestart}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Play Again
          </button>
          <button
            onClick={handleNewMatch}
            className="px-6 py-2 bg-foreground text-background rounded-lg hover:opacity-90"
          >
            New Match
          </button>
        </div>
      </div>
    </div>
  );
}