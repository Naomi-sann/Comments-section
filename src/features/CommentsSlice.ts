import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import datas from '../data/data';
import type { Comment } from '../data/data';

interface InitialState {
    sort: "newest" | "oldest" | "most-score",
    comments: Comment[]
}

const initialState: InitialState = { sort: "newest", comments: datas.comments };

const CommentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment(state, action: PayloadAction<Comment>) {
            state.comments.unshift(action.payload);
        },
        setComment(state, action: PayloadAction<Comment[]>) {
        },
        deleteComment(state, { payload }: PayloadAction<number>) {
            if (state.comments.findIndex(c => c.id === payload) < 0)
                state.comments.forEach(c => c.replies = c.replies.filter(r => r.id !== payload));
            else return { ...state, comments: state.comments.filter(c => c.id !== payload) };
        }
    }
});

export const { addComment, setComment, deleteComment } = CommentsSlice.actions
export default CommentsSlice.reducer;