import { createSlice } from "@reduxjs/toolkit";
import datas from "../data/data";

const initialState = datas.currentUser;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;