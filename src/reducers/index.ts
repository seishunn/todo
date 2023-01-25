import {combineReducers, configureStore} from "@reduxjs/toolkit";
import todoListReducer from "./todoList-reducer";
import userReducer from "./user-reducer";
import notificationReducer from "./notification-reducer";

const rootReducer = combineReducers({
    todoList: todoListReducer,
    user: userReducer,
    notification: notificationReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
