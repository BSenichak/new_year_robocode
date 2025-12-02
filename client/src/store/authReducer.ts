import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../api/user.api";

type InitialState = {
    users: any[];
};

const initialState: InitialState = {
    users: [],
};

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });
    },
});

export const getUsers = createAsyncThunk("auth/getUsers", async () => {
    try {
        const response = await userAPI.getUsers();
        return response.data;
    } catch (err) {
        console.error(err);
    }
});

export const {} = authReducer.actions;

export default authReducer.reducer;
