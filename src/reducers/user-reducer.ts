import {createSlice} from "@reduxjs/toolkit";

export interface IUser {
    id: number | null
    email: string
    login: string
    password: string
}

interface IInitialState {
    user: IUser
    isAuth: boolean
}

const initialState: IInitialState = {
    user: {
        id: null,
        email: "",
        login: "",
        password: ""
    },
    isAuth: false
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state: IInitialState, action) {
            state.user = action.payload;
            state.isAuth = true;
        },
        deleteUser(state: IInitialState) {
            state.user = {
                id: null,
                email: "",
                login: "",
                password: ""
            };
            state.isAuth = false;
            localStorage.removeItem("token");
        }
    }
})

export default userReducer.reducer;