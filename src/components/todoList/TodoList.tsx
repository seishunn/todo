import React, {useState} from 'react';
import cl from './TodoList.module.scss'
import Todo, {ITodo} from "../UI/todo/Todo";
import {IconsSvg} from "../../assets/icons/Icons";
import InputTodo from "../UI/inputTodo/InputTodo";

const TodoList = () => {
    const [todoList, setTodoList] = useState<ITodo[]>([
        {id: 0, description: "Hello, React", comment: "Sub"},
        {id: 1, description: "Hello, React", comment: "Sub"},
        {id: 2, description: "Hello, React", comment: "Sub"},
        {id: 3, description: "Hello, React", comment: "Sub"},
        {id: 4, description: "Hello, React", comment: "Sub"},
        {id: 5, description: "Hello, React", comment: "Sub"},
    ]);
    const [todo, setTodo] = useState<ITodo>({id: null, comment: "", description: ""});
    const [inputIsVisible, setInputIsVisible] = useState<boolean>(false);

    const addTodo = (todoAdd: ITodo) => {
        setTodoList([...todoList, todoAdd]);
    }

    const deleteTodo = (id: number) => {
        setTodoList([...todoList.filter(todo => todo.id !== id)]);
    }

    const changeVisibility = () => {
        setInputIsVisible(prevState => !prevState);
    }

    const saveChanges = (todo: ITodo) => {
        addTodo(todo);
    }

    return (
        <div className={cl.todoList}>
            <div className={cl.title}>Входящие</div>
            <ul>
                {todoList.map(todo => <Todo
                                            key={todo.id}
                                            id={todo.id}
                                            description={todo.description}
                                            deleteTodo={deleteTodo}
                                            comment={todo.comment}
                />)}

            </ul>
            {inputIsVisible
                ? <InputTodo todo={todo} saveChanges={saveChanges} changeVisibility={changeVisibility}/>
                : <div className={cl.addTodo} onClick={changeVisibility}>
                    {new IconsSvg().plus()}<span>Добавить задачу</span>
                </div>
            }
        </div>
    );
};

export default TodoList;
