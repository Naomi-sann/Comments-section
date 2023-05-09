import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Alert {
    type: "alert" | "prompt";
    title: string;
    message: string;
}

interface AlertState extends Alert {
    isShowing: boolean;
}

const initialState: AlertState = {
    isShowing: false,
    type: "alert",
    title: "",
    message: "",
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        showAlert(state, action: PayloadAction<Alert>) {
            return { ...action.payload, isShowing: true }
        },
        hideAlert(state, { payload: { delay } }: PayloadAction<{ delay: number | undefined }>) {
            if (delay)
                setTimeout(() => {
                    state.isShowing = false;
                }, delay)
            else state.isShowing = false;
        }
    }
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;