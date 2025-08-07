import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MatchState {
  round: number;
  player1Wins: number;
  player2Wins: number;
  draws: number;
  matchOver: boolean;
  finalWinner: "player1" | "player2" | "draw" | null;
  history: Array<{
    round: number;
    winner: "player1" | "player2" | "draw";
    squares: (string | null)[];
  }>;
}

const initialState: MatchState = {
  round: 1,
  player1Wins: 0,
  player2Wins: 0,
  draws: 0,
  matchOver: false,
  finalWinner: null,
  history: [],
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    recordRoundResult(
      state,
      action: PayloadAction<{
        winner: "player1" | "player2" | "draw";
        squares: (string | null)[];
      }>
    ) {
      // Record the round result
      state.history.push({
        round: state.round,
        winner: action.payload.winner,
        squares: [...action.payload.squares],
      });

      // Update scores
      if (action.payload.winner === "player1") {
        state.player1Wins += 1;
      } else if (action.payload.winner === "player2") {
        state.player2Wins += 1;
      } else {
        state.draws += 1;
      }

      // Check match conditions
      const hasWinner = state.player1Wins >= 3 || state.player2Wins >= 3;
      const maxRoundsReached = state.round >= 5;

      if (hasWinner || maxRoundsReached) {
        state.matchOver = true;
        if (state.player1Wins > state.player2Wins) {
          state.finalWinner = "player1";
        } else if (state.player2Wins > state.player1Wins) {
          state.finalWinner = "player2";
        } else {
          state.finalWinner = "draw";
        }
      } else {
        state.round += 1;
      }
    },
    resetMatch(state) {
      return initialState;
    },
  },
});

export const { recordRoundResult, resetMatch } = matchSlice.actions;
export default matchSlice.reducer;