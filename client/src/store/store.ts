import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import { createLogger } from "redux-logger";
import modalReducer from "./modalSlice";
import sudokuReducer from "./sudokuSlice";
import resultsReducer from "./resultsSlice";
import leaderboardReducer from "./leaderboardSlice";
import errorReducer from "./errorSlice";
import { setupInterceptors } from "../api/apiInterceptors";

const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: false,
    logErrors: true,
    predicate: (_, action) => {
        return !action.type.includes("persist");
    },
});

export const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        sudoku: sudokuReducer,
        results: resultsReducer,
        leaderboard: leaderboardReducer,
        error: errorReducer
    },
    middleware: (getDefaultMiddleware) =>
        import.meta.env.DEV
            ? getDefaultMiddleware().concat(logger)
            : getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupInterceptors(store.dispatch);
