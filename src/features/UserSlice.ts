import { createSlice } from "@reduxjs/toolkit";
import datas from "../data/data";

const initialState = datas.currentUser;

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state = action.payload;
        }
    }
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;