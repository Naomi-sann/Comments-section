import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "./CommentsSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
    reducer: {
        comments: commentsSlice,
        user: UserSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;