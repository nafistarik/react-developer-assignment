"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { resetMatch } from "@/redux/features/matchSlice";
import { resetBoard } from "@/redux/features/boardSlice";
import { useRouter } from "next/navigation";

interface PlayerStats {
  name: string;
  wins: number;
  losses: number;
  draws: number;
  lastPlayed: string;
  winRate: number;
}

export default function Leaderboard() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const leaderboard = useAppSelector((state) => state.leaderboard);
  const players = useAppSelector((state) => state.player);

  // Convert players object to array, calculate win rate, and sort
  const sortedPlayers: PlayerStats[] = Object.entries(leaderboard.players)
    .map(([name, stats]) => {
      const totalGames = stats.wins + stats.losses + stats.draws;
      const winRate = totalGames > 0 ? (stats.wins / totalGames) * 100 : 0;

      return {
        name,
        ...stats,
        winRate: parseFloat(winRate.toFixed(1)), // Round to 1 decimal place
      };
    })
    .sort((a, b) => {
      // Sort by wins descending, then by win rate, then by name
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (b.winRate !== a.winRate) return b.winRate - a.winRate;
      return a.name.localeCompare(b.name);
    });

  const handleBackToGame = () => {
    // Reset game state
    dispatch(resetBoard());
    dispatch(resetMatch());
    // Navigate to player setup page
    router.push("/");
  };

  return (
    <div className="p-6 bg-[var(--background)] flex items-center justify-center min-h-[calc(100vh-140px)]">
      <div className="max-w-5xl w-full">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-[var(--foreground)] select-none">
            Leaderboard
          </h1>
          <button
            onClick={handleBackToGame}
            className="px-5 py-2 bg-[var(--primary)] text-white rounded-xl font-semibold hover:bg-[var(--primary-hover)] transition-colors select-none"
          >
            New Game
          </button>
        </div>

        {sortedPlayers.length === 0 ? (
          <div className="bg-[var(--card)] rounded-xl p-12 text-center text-[var(--muted-foreground)] select-none shadow-lg">
            No matches recorded yet. Play a match to see stats!
          </div>
        ) : (
          <div className="bg-[var(--card)] rounded-xl shadow-lg overflow-x-auto border border-[var(--border)]">
            <table className="w-full table-fixed">
              <thead className="bg-[var(--muted)]">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold select-none">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left font-semibold select-none">
                    Player
                  </th>
                  <th className="px-6 py-4 text-center font-semibold select-none">
                    Wins
                  </th>
                  <th className="px-6 py-4 text-center font-semibold select-none">
                    Losses
                  </th>
                  <th className="px-6 py-4 text-center font-semibold select-none">
                    Draws
                  </th>
                  <th className="px-6 py-4 text-center font-semibold select-none">
                    Points
                  </th>
                  <th className="px-6 py-4 text-center font-semibold select-none">
                    Win Rate
                  </th>
                  <th className="px-6 py-4 text-right font-semibold select-none">
                    Last Played
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {sortedPlayers.map((player, index) => (
                  <tr
                    key={player.name}
                    className="hover:bg-[var(--muted)]/50 transition-colors cursor-default select-text"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-semibold">
                      {player.name === players.player1
                        ? `${player.name} (X)`
                        : player.name === players.player2
                        ? `${player.name} (O)`
                        : player.name}
                    </td>
                    <td className="px-6 py-4 text-center text-[var(--primary)] font-semibold">
                      {player.wins}
                    </td>
                    <td className="px-6 py-4 text-center text-[var(--destructive)] font-semibold">
                      {player.losses}
                    </td>
                    <td className="px-6 py-4 text-center">{player.draws}</td>
                    <td className="px-6 py-4 text-center text-[var(--primary)] font-semibold">
                      {player.wins * 2 + player.draws}
                    </td>
                    <td className="px-6 py-4 text-center">{player.winRate}%</td>
                    <td className="px-6 py-4 text-right text-sm text-[var(--muted-foreground)]">
                      {new Date(player.lastPlayed).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
