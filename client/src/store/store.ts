import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import logger from "redux-logger";
export const store = configureStore({
    reducer: {
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        import.meta.env.DEV ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
