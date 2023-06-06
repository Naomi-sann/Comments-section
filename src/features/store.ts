import { configureStore } from "@reduxjs/toolkit";
import CommentsSlice from "./CommentsSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
    reducer: {
        comments: CommentsSlice,
        user: UserSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;