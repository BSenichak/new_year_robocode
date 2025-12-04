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
    chosenCell: { row: number; col: number } | null;
    playerAnswers: string[];
    correctCount: number; 
};

const initialState: SudokuState = {
    sudoku: null,
    isLoading: false,
    difficulty: "easy",
    chosenCell: null,
    playerAnswers: [],
    correctCount: 0,
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
        setChosenCell(state, action) {
            state.chosenCell = action.payload;
        },
        setChosenCellValue(state, action) {
            const { row, col, value } = action.payload;
            if (!state.sudoku) return;
            const index = row * 9 + col;

            state.playerAnswers[index] = value;

            if (
                state.sudoku.puzzle.length === 81 &&
                state.sudoku.solution.length === 81 &&
                state.playerAnswers.length === 81
            ) {
                state.correctCount = countCorrectMatches(
                    state.sudoku.puzzle,
                    state.playerAnswers,
                    state.sudoku.solution
                );
            }
        },
        clearValues(state) {
            state.playerAnswers = Array(81).fill("0");
            state.chosenCell = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSudoku.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSudoku.fulfilled, (state, action) => {
                state.sudoku = action.payload;
                state.isLoading = false;
                state.playerAnswers = Array(81).fill("0");
                state.correctCount = 0;
            })
            .addCase(getSudoku.rejected, (state, action) => {
                state.sudoku = null;
                state.isLoading = false;
                console.error("Failed to fetch Sudoku:", action.error.message);
            });
    },
});

export const { setDifficulty, setChosenCell, setChosenCellValue, clearValues } =
    sudokuSlice.actions;

export default sudokuSlice.reducer;

function countCorrectMatches(
    puzzle: string,
    playerAnswers: (string | null)[],
    solution: string
): number {
    if (
        puzzle.length !== 81 ||
        playerAnswers.length !== 81 ||
        solution.length !== 81
    ) {
        throw new Error("All inputs must have length 81");
    }

    let combined = "";

    for (let i = 0; i < 81; i++) {
        const puzzleValue = puzzle[i];
        const playerValue = playerAnswers[i];
        combined += puzzleValue !== "0" ? puzzleValue : playerValue ?? "0";
    }

    let matches = 0;
    for (let i = 0; i < 81; i++) {
        if (combined[i] === solution[i]) {
            matches++;
        }
    }

    return matches;
}
