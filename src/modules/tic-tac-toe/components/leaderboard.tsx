"use client";

import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

interface PlayerStats {
  name: string;
  wins: number;
  losses: number;
  draws: number;
  lastPlayed: string;
  winRate: number;
}

export default function Leaderboard() {
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
        winRate: parseFloat(winRate.toFixed(1)) // Round to 1 decimal place
      };
    })
    .sort((a, b) => {
      // Sort by wins descending, then by win rate, then by name
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (b.winRate !== a.winRate) return b.winRate - a.winRate;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <Link 
            href="/" 
            className="text-primary hover:underline"
          >
            Back to Game
          </Link>
        </div>
        
        {sortedPlayers.length === 0 ? (
          <div className="bg-card rounded-lg p-8 text-center text-muted-foreground">
            No matches recorded yet. Play a match to see stats!
          </div>
        ) : (
          <div className="bg-card rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left">Rank</th>
                  <th className="px-4 py-3 text-left">Player</th>
                  <th className="px-4 py-3 text-center">Wins</th>
                  <th className="px-4 py-3 text-center">Losses</th>
                  <th className="px-4 py-3 text-center">Draws</th>
                  <th className="px-4 py-3 text-center">Win Rate</th>
                  <th className="px-4 py-3 text-right">Last Played</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedPlayers.map((player, index) => (
                  <tr key={player.name} className="hover:bg-muted/50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">
                      {player.name === players.player1 ? `${player.name} (X)` : 
                       player.name === players.player2 ? `${player.name} (O)` : 
                       player.name}
                    </td>
                    <td className="px-4 py-3 text-center text-primary">{player.wins}</td>
                    <td className="px-4 py-3 text-center text-destructive">{player.losses}</td>
                    <td className="px-4 py-3 text-center">{player.draws}</td>
                    <td className="px-4 py-3 text-center">{player.winRate}%</td>
                    <td className="px-4 py-3 text-right text-sm text-muted-foreground">
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