import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MatchState {
  round: number;
  player1Wins: number;
  player2Wins: number;
  draws: number;
  matchOver: boolean;
  finalWinner: "player1" | "player2" | "draw" | null;
}

const initialState: MatchState = {
  round: 1,
  player1Wins: 0,
  player2Wins: 0,
  draws: 0,
  matchOver: false,
  finalWinner: null,
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    updateMatchResult(
      state,
      action: PayloadAction<"player1" | "player2" | "draw">
    ) {
      if (state.matchOver) return;
      if (action.payload === "player1") {
        state.player1Wins += 1; //if player 1 wins
      } else if (action.payload === "player2") {
        state.player2Wins += 1; //if player2 wins
      } else {
        state.draws += 1; //if draw
      }
      const totalRoundsPlayed =
        state.player1Wins + state.player2Wins + state.draws;
      if (
        state.player1Wins === 3 || //already player 1 win 3
        state.player2Wins === 3 || //already player2 win 3
        totalRoundsPlayed === 5 // 5 round ended
      ) {
        state.matchOver = true;
        if (state.player1Wins > state.player2Wins)
          state.finalWinner = "player1"; //player 1 more win
        else if (state.player2Wins > state.player1Wins)
          state.finalWinner = "player2"; //player 2 more win
        else state.finalWinner = "draw"; //both same
      } else {
        state.round += 1; //next round
      }
    },

    resetMatch(state) {
      state.round = 1;
      state.player1Wins = 0;
      state.player2Wins = 0;
      state.draws = 0;
      state.matchOver = false;
      state.finalWinner = null;
    },
  },
});

export const { updateMatchResult, resetMatch } = matchSlice.actions;
export default matchSlice.reducer;
