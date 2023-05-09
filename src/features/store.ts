import { configureStore } from "@reduxjs/toolkit";
import CommentsSlice from "./CommentsSlice";
import UserSlice from "./UserSlice";
import AlertSlice from "./AlertSlice";

const store = configureStore({
    reducer: {
        comments: CommentsSlice,
        user: UserSlice,
        alert: AlertSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;