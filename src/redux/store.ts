import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "@/redux/features/boardSlice";
import playerReducer from "@/redux/features/playerSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
