import React from 'react';
import cl from './Navbar.module.scss';
import TodoListLink from "../UI/navigationLink/NavigationLink";
import Button from "../UI/button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {addNewTodoList, deleteTodoList, getTodosFromList} from "../../actions/todo";
import {todoListReducer} from "../../reducers/todoList-reducer";
import {userReducer} from "../../reducers/user-reducer";
import Profile from "./Profile/Profile";

const {setCurrentTodoList, clearTodo} = todoListReducer.actions;
const {deleteUser} = userReducer.actions;


const Navbar = () => {
    const todoLists = useAppSelector(state => state.todoList.todoLists);
    const currentTodoList = useAppSelector(state => state.todoList.currentTodoList);
    const user = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();

    const createTodoList = () => {
        const title = prompt("Введите название todoList");
        dispatch(addNewTodoList(title!, user.id!));
    }

    const deleteList = (id: number) => {
        dispatch(deleteTodoList(id, user.id!, currentTodoList.id!));
    }

    const getTodos = async (idTodoList: number, titleTodoList: string) => {
        dispatch(setCurrentTodoList({id: idTodoList, title: titleTodoList}));
        dispatch(getTodosFromList(idTodoList));
    }

    const logOut = () => {
        dispatch(deleteUser());
        dispatch(clearTodo())
    }

    return (
        <div className={cl.navbar}>
            <Profile user={user} logout={logOut}/>
            <div className={cl.navbar_footer}>
                <ul className={cl.navbar_list}>
                    {todoLists.map(todoList => {
                        return (
                            <TodoListLink
                                key={todoList.id}
                                title={todoList.title}
                                count={todoList.id!}
                                deleteTodoList={() => deleteList(todoList.id!)}
                                onClick={() => getTodos(todoList.id!, todoList.title)}
                            />
                        )
                    })}
                </ul>
                <Button buttonStyle={"orange"} onClick={createTodoList}>Добавить todo</Button>
            </div>
        </div>
    );
};

export default React.memo(Navbar);
