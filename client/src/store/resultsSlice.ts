import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/resultsApi";
import type { Difficulty } from "../utils/types";
import type { RootState } from "./store";

type ResultsState = {
  loading: boolean;
  progress: number;
  victorySent: boolean; // ✅ прапорець захисту
};

const initialState: ResultsState = {
  loading: false,
  progress: 0,
  victorySent: false,
};

// ✅ ВІДПРАВКА ПЕРЕМОГИ
export const victory = createAsyncThunk(
  "results/victory",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const difficulty = state.sudoku.difficulty as Difficulty;

    const { data } = await api.victory(difficulty);
    return data;
  }
);

// ✅ ОТРИМАННЯ ПРОГРЕСУ
export const getProgress = createAsyncThunk(
  "results/getProgress",
  async () => {
    const { data } = await api.getProgress();
    return data;
  }
);

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    // ✅ ПОМІТИТИ ЩО ВЖЕ ВІДПРАВЛЕНО
    markVictorySent(state) {
      state.victorySent = true;
    },

    // ✅ СКИНУТИ ПРИ ЗАКРИТТІ МОДАЛКИ
    resetVictorySent(state) {
      state.victorySent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ----- getProgress -----
      .addCase(getProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgress.fulfilled, (state, action) => {
        state.progress = action.payload.count || 0;
        state.loading = false;
      })
      .addCase(getProgress.rejected, (state) => {
        state.loading = false;
      })

      // ----- victory -----
      .addCase(victory.pending, (state) => {
        state.loading = true;
      })
      .addCase(victory.fulfilled, (state, action) => {
        state.progress = action.payload.victories || 0;
        state.loading = false;
      })
      .addCase(victory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  markVictorySent,
  resetVictorySent,
} = resultsSlice.actions;

export default resultsSlice.reducer;
