import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

type LeaderboardState = {
    stats: {
        totalPlayers: number;
        totalDecodeCount: number;
        todayDecodeCount: number;
    } | null;
    leaders:
        | any
        | [
              {
                  place: number;
                  name: string;
                  filesDecoded: number;
                  points: number;
              }
          ];
    loading: boolean;
};

const initialState: LeaderboardState = {
    stats: null,
    leaders: null,
    loading: false,
};


export const fetchLeaderboardStats = createAsyncThunk(
    "leaderboard/fetchStats",
    async () => {
        const { data } = await axios.get("/stats"); 
        return data;
    }
);


export const fetchLeaders = createAsyncThunk(
    "leaderboard/fetchLeaders",
    async () => {
        const { data } = await axios.get("/leaderboard"); 
        return data;
    }
);

const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaderboardStats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLeaderboardStats.fulfilled, (state, action) => {
                state.stats = action.payload;
                state.loading = false;
            })
            .addCase(fetchLeaderboardStats.rejected, (state) => {
                state.stats = null;
                state.loading = false;
            })
            .addCase(fetchLeaders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLeaders.fulfilled, (state, action) => {
                state.leaders = action.payload;
                state.loading = false;
            })
            .addCase(fetchLeaders.rejected, (state) => {
                state.leaders = null;
                state.loading = false;
            });
    },
});

export default leaderboardSlice.reducer;
