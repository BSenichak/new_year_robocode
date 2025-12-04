import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/resultsApi";
import type { Difficulty } from "../utils/types";

type ResultsState = {
    loading: boolean;
    progress: number;
};

const initialState: ResultsState = {
    loading: false,
    progress: 0,
};

const resultsSlice = createSlice({
    name: "results",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProgress.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProgress.fulfilled, (state, action) => {
                state.progress = action.payload.count || 0;
                state.loading = false;
            })
            .addCase(getProgress.rejected, (state) => {
                state.loading = false;
            });
    },
});



export let victory = createAsyncThunk("results/victory", async (_, { getState }: { getState: any }) => {
    let difficulty = (getState() as any).sudoku.difficulty as Difficulty;
    console.log(difficulty)
    let { data } = await api.victory(difficulty);
    return data;
});

export let getProgress = createAsyncThunk("results/getProgress", async () => {
    let { data } = await api.getProgress();
    return data;
});

export const {} = resultsSlice.actions;

export default resultsSlice.reducer;
