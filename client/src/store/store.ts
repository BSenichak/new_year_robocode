import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import { createLogger } from "redux-logger";

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
    },
    middleware: (getDefaultMiddleware) =>
        import.meta.env.DEV
            ? getDefaultMiddleware().concat(logger)
            : getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
