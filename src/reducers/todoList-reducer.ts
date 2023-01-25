import {createSlice} from "@reduxjs/toolkit";
import {ITodo} from "../components/UI/todo/TodoItem";

interface ITodoList {
    id: number | null
    userId: number | null
    title: string
}
interface IInitialState {
    todoLists: ITodoList[]
    currentTodoList: {
        id: number | null
        title: string
    }
    todoListItems: ITodo[]
}

const initialState: IInitialState = {
    todoLists: [],
    currentTodoList: {
        id: null,
        title: ""
    },
    todoListItems: []
}

export const todoListReducer = createSlice({
    name: "todoList",
    initialState,
    reducers: {
        setTodoLists(state, action) {
            state.todoLists = action.payload;
        },
        setTodoListItems(state, action) {
            state.todoListItems = [...action.payload];
        },
        setCurrentTodoList(state, action) {
            state.currentTodoList = action.payload;
        },
        addTodoList(state, action) {
            state.todoLists = [...state.todoLists, action.payload];
        },
        deleteCurrentTodoList(state) {
            state.currentTodoList = {id: null, title: ""};
        },
        addTodoListItems(state, action) {
            state.todoListItems = [...state.todoListItems, action.payload]
        },
        clearTodo(state) {
            state.todoListItems = [];
            state.currentTodoList = {id: null, title: ""};
            state.todoLists = [];
        }
    }
})

export default todoListReducer.reducer;
