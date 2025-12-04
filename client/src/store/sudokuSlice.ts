import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Difficulty } from "../utils/types";
import api from "../api/sudokuApi";
import { caesarDecipher } from "../utils/encripters";

type SudokuState = {
    sudoku: {
        difficulty: string;
        puzzle: string;
        solution: string;
    } | null;
    isLoading: boolean;
    difficulty: Difficulty;
};

const initialState: SudokuState = {
    sudoku: null,
    isLoading: false,
    difficulty: "easy",
};

export const getSudoku = createAsyncThunk(
    "sudoku/getSudoku",
    async (difficulty: Difficulty) => {
        const result = await api.getSudoku(difficulty);
        const keyHeader = result.headers["x-caesar-key".toLowerCase()];
        if (!keyHeader) {
            throw new Error("Caesar key missing in response headers");
        }

        const key = Number(keyHeader);

        const decrypted = {
            difficulty: caesarDecipher(result.data.difficulty, key),
            puzzle: caesarDecipher(result.data.puzzle, key),
            solution: caesarDecipher(result.data.solution, key),
        };
        return decrypted;
    }
);

const sudokuSlice = createSlice({
    name: "sudoku",
    initialState,
    reducers: {
        setDifficulty(state, action) {
            state.difficulty = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSudoku.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSudoku.fulfilled, (state, action) => {
                state.sudoku = action.payload;
                state.isLoading = false;
            })
            .addCase(getSudoku.rejected, (state, action) => {
                state.sudoku = null;
                state.isLoading = false;
                console.error("Failed to fetch Sudoku:", action.error.message);
            });
    },
});

export const { setDifficulty } = sudokuSlice.actions;

export default sudokuSlice.reducer;
