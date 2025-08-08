import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "@/redux/features/boardSlice";
import playerReducer from "@/redux/features/playerSlice";
import matchReducer from "@/redux/features/matchSlice";
import leaderboardReducer from "@/redux/features/leaderboardSlice";
import { productsApi } from "@/redux/api/productsApi";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    player: playerReducer,
    match: matchReducer,
    leaderboard: leaderboardReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
