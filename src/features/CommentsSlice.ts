import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import datas from '../data/data';
import type { Datas, Comment } from '../data/data';

const initialState: Datas = datas;

const commentsSlice = createSlice({
    name: "datas",
    initialState,
    reducers: {
        getComment(state, action: PayloadAction<number>) {
            console.log(action, ' : action');
            console.log(state, " : state");
        },
        setComment(state, action: PayloadAction<Comment[]>) {

            state.comments = action.payload;
        },
        deleteComment(state, { payload }: PayloadAction<number>) {
            state.comments = state.comments.filter(c => c.id !== payload);
        }
    }
});

export const { getComment, setComment, deleteComment } = commentsSlice.actions
export default commentsSlice.reducer;