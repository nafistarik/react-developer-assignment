import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "@/redux/features/boardSlice";
import playerReducer from "@/redux/features/playerSlice";
import matchReducer from "@/redux/features/matchSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    player: playerReducer,
    match: matchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
