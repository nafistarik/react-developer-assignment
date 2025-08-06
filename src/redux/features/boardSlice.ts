import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoardState {
  squares: (string | null)[];
  isFirstPlayerTurn: boolean;
}

const initialState: BoardState = {
  squares: Array(9).fill(null),
  isFirstPlayerTurn: true,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    makeMove(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (state.squares[index]) return;
      state.squares[index] = state.isFirstPlayerTurn ? "X" : "O";
      state.isFirstPlayerTurn = !state.isFirstPlayerTurn;
    },
    resetBoard(state) {
      state.squares = Array(9).fill(null);
      state.isFirstPlayerTurn = true;
    },
  },
});

export const { makeMove, resetBoard } = boardSlice.actions;
export default boardSlice.reducer;
