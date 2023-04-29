import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "./CommentsSlice";

const store = configureStore({
    reducer: {
        datas: commentsSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;