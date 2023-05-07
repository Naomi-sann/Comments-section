import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import datas from '../data/data';
import type { Comment } from '../data/data';

const initialState: Comment[] = datas.comments;

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment(state, action: PayloadAction<Comment>) {
            state.push(action.payload);
            // console.log(action.payload);

        },
        setComment(state, action: PayloadAction<Comment[]>) {

            state = action.payload;
        },
        deleteComment(state, { payload }: PayloadAction<number>) {
            state = state.filter(c => c.id !== payload);
        }
    }
});

export const { addComment, setComment, deleteComment } = commentsSlice.actions
export default commentsSlice.reducer;