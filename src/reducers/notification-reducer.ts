import {createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    notification: {
        message: string
        error: 0 | 1
    }
}

const initialState: IInitialState = {
    notification: {
        message: "",
        error: 0
    }
}

export const notificationReducer = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action) {
            state.notification = action.payload;
        }
    }
})

export default notificationReducer.reducer;