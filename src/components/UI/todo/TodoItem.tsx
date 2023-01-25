import React, {useCallback, useEffect, useState} from 'react';
import cl from './Todo.module.scss';
import ButtonMiniIco from "../buttonMiniIco/ButtonMiniIco";
import InputTodo from "../inputTodo/InputTodo";
import {updateTodoInList} from "../../../actions/todo";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import classNames from "classnames";


export interface ITodo {
    id: number | null
    value: string
    completed: boolean
}

interface ITodoProps {
    deleteTodo: (id: number) => void
}

const TodoItem: React.FC<ITodo & ITodoProps> = ({id, value, completed, deleteTodo}) => {
    const [isCompleted, setIsCompleted] = useState(completed);
    const [visible, setVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const currentTodoList = useAppSelector(state => state.todoList.currentTodoList);

    const changeVisibility = useCallback(() => {
        setVisible(prevState => !prevState);
    }, []);

    const changeCompleted = () => {
        setIsCompleted(prevState => !prevState);
        dispatch(updateTodoInList(id!, currentTodoList.id!, value, isCompleted));
    }

    useEffect(() => {
        dispatch(updateTodoInList(id!, currentTodoList.id!, value, isCompleted));
    }, [isCompleted]);

    const saveChanges = (value: string) => {
        dispatch(updateTodoInList(id!, currentTodoList.id!, value, isCompleted));
    }

    if (visible) {
        return <InputTodo
            value={value}
            saveChanges={saveChanges}
            changeVisibility={changeVisibility}
        />
    }

    return (
        <li className={classNames(
            cl.todo,
            {[cl.todo_completed]: isCompleted}
        )}>
            <label>
                <input type="checkbox" onChange={changeCompleted} checked={isCompleted}/>
                <span className={cl.todo_value}>{value}</span>
                <div className={cl.todo_mode}>
                    <ButtonMiniIco ico={"edit"} onClick={changeVisibility}/>
                    <ButtonMiniIco ico={"trash"} onClick={() => deleteTodo(id!)}/>
                </div>
            </label>
        </li>
    );
};

export default React.memo(TodoItem);
