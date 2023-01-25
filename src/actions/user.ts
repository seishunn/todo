import axios from "axios";
import {AppDispatch} from "../reducers";
import {userReducer} from "../reducers/user-reducer";
import {notificationReducer} from "../reducers/notification-reducer";
const {setNotification} = notificationReducer.actions;


const API_URL = 'http://localhost:5000/';
const {setUser} = userReducer.actions;

export const registration = (email: string, login: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post(`${API_URL}auth/registration`, {
                email,
                login,
                password
            })
            dispatch(setNotification({message: response.data.message, error: response.data.error || 0}))
        } catch (err: any) {
            dispatch(setNotification({message: err.response.data.message, error: 1}))
        }
    }
}

export const login = (email: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post(`${API_URL}auth/login`, {
                email,
                password
            })
            dispatch(setNotification({message: response.data.message, error: 0}))
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", response.data.token);
        } catch (err: any) {
            dispatch(setNotification({message: err.response.data.message, error: 1}))
        }
    }
}

export const auth = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get(`${API_URL}auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", response.data.token);
        } catch (err) {
            localStorage.removeItem("token");
        }
    }
}