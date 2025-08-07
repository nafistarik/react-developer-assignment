import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerStats {
  wins: number;
  losses: number;
  draws: number;
  lastPlayed: string;
}

interface LeaderboardState {
  players: Record<string, PlayerStats>;
}

const initialState: LeaderboardState = {
  players: {},
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    addMatchResult(
      state,
      action: PayloadAction<{
        player1: string;
        player2: string;
        player1Wins: number;
        player2Wins: number;
        draws: number;
        finalWinner: "player1" | "player2" | "draw" | null;
      }>
    ) {
      const { player1, player2, player1Wins, player2Wins, draws } = action.payload;
      const now = new Date().toISOString();

      // Initialize players if they don't exist
      if (!state.players[player1]) {
        state.players[player1] = { wins: 0, losses: 0, draws: 0, lastPlayed: now };
      }
      if (!state.players[player2]) {
        state.players[player2] = { wins: 0, losses: 0, draws: 0, lastPlayed: now };
      }

      // Update stats based on match result
      state.players[player1].wins += player1Wins;
      state.players[player1].losses += player2Wins;
      state.players[player1].draws += draws;
      
      state.players[player2].wins += player2Wins;
      state.players[player2].losses += player1Wins;
      state.players[player2].draws += draws;

      // Update last played time
      state.players[player1].lastPlayed = now;
      state.players[player2].lastPlayed = now;
    },
    clearLeaderboard(state) {
      state.players = {};
    },
  },
});

export const { addMatchResult, clearLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;