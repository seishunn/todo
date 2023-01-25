import React, {useState} from 'react';
import cl from './TodoList.module.scss'
import TodoItem from "../UI/todo/TodoItem";
import {IconsSvg} from "../../assets/icons/Icons";
import InputTodo from "../UI/inputTodo/InputTodo";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {addTodoInList, deleteTodoFromList} from "../../actions/todo";

const TodoList = () => {
    const dispatch = useAppDispatch();
    const [inputIsVisible, setInputIsVisible] = useState<boolean>(false);
    const todoListItems = useAppSelector(state => state.todoList.todoListItems);
    const todoLists = useAppSelector(state => state.todoList.todoLists);
    const currentTodoList = useAppSelector(state => state.todoList.currentTodoList);

    const deleteTodo = (id: number) => {
        dispatch(deleteTodoFromList(id, currentTodoList.id!));
    }
    const changeVisibility = () => {
        setInputIsVisible(prevState => !prevState)
    }
    const saveChanges = (value: string) => {
        dispatch(addTodoInList(currentTodoList.id!, value));
    }

    if (!currentTodoList.id || !todoLists.length) {
        return (
            <div className={cl.todoList}>
                <div className={cl.title}>Выберите один из Todo листов или создайте его</div>
            </div>
        )
    }

    return (
        <div className={cl.todoList}>
            <div className={cl.title}>{currentTodoList.title}</div>
            {inputIsVisible
                ? <InputTodo
                    value={""}
                    saveChanges={saveChanges}
                    changeVisibility={changeVisibility}/>
                : <div className={cl.addTodo} onClick={changeVisibility}>
                    {new IconsSvg().plus()}<span>Добавить задачу</span>
                </div>
            }
            <ul>
                {todoListItems.map(t => <TodoItem
                                            key={t.id}
                                            id={t.id}
                                            value={t.value}
                                            deleteTodo={deleteTodo}
                                            completed={t.completed}
                />)}
            </ul>
        </div>
    );
};

export default TodoList;
