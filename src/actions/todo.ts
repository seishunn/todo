import axios from "axios";
import {todoListReducer} from "../reducers/todoList-reducer";
import {AppDispatch} from "../reducers";
import {notificationReducer} from "../reducers/notification-reducer";
const API_URL = 'http://localhost:5000/';
const {setTodoLists, setTodoListItems, deleteCurrentTodoList} = todoListReducer.actions;
const {setNotification} = notificationReducer.actions;

export const getTodoLists = () => {
    return async (dispatch: AppDispatch) => {
        const response = await axios.get(`${API_URL}todo/lists`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        dispatch(setTodoLists(response.data));
    }
}
export const addNewTodoList = (title: string, user_id: number) => {
    return async (dispatch: AppDispatch) => {
        await axios.post(`${API_URL}todo/lists`,{
            user_id,
            title
        }, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        dispatch(getTodoLists())
    }
}
export const deleteTodoList = (id: number, user_id: number, currentTodoListId: number) => {
    return async (dispatch: AppDispatch) => {
        const response = await axios.delete(`${API_URL}todo/lists?todoListId=${id}&user_id=${user_id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        dispatch(setNotification({message: response.data.message, error: response.data.error || 0}))

        if (response.data.error) {
            return null
        }

        if (currentTodoListId === id) {
            dispatch(deleteCurrentTodoList());
        }

        dispatch(getTodoLists());
    }
}

export const getTodosFromList = (id: number) => {
    return async (dispatch: AppDispatch) => {
        const response = await axios.get(`${API_URL}todo/lists/todo?id=${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        dispatch(setTodoListItems(response.data));
    }
}
export const addTodoInList = (todolist_id: number, value: string) => {
    return async (dispatch: AppDispatch) => {
        const response = await axios.post(`${API_URL}todo/lists/todo`, {
            id: todolist_id,
            value
        },{
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        dispatch(setNotification({message: response.data.message, error: response.data.error || 0}))

        dispatch(getTodosFromList(todolist_id));
    }
}
export const deleteTodoFromList = (id: number, todoListId: number) => {
    return async (dispatch: AppDispatch) => {
        const response = await axios.delete(`${API_URL}todo/lists/todo?id=${id}&todoListId=${todoListId}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        dispatch(setNotification({message: response.data.message, error: response.data.error || 0}))

        dispatch(getTodosFromList(todoListId));
    }
}
export const updateTodoInList = (todo_id: number, todoList_id: number,  value: string, completed: boolean) => {
    return async (dispatch: AppDispatch) => {
        await axios.put(`${API_URL}todo/lists/todo`, {
            todo_id,
            value,
            completed
        }, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        dispatch(getTodosFromList(todoList_id));
    }
}