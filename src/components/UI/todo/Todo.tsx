import React, {useCallback, useState} from 'react';
import cl from './Todo.module.scss';
import ButtonMiniIco from "../buttonMiniIco/ButtonMiniIco";
import InputTodo from "../inputTodo/InputTodo";

export interface ITodo {
    id: number | null
    description: string
    comment?: string
}

interface ITodoProps {
    deleteTodo: (id: number) => void
}

const Todo: React.FC<ITodo & ITodoProps> = ({id, comment, description, deleteTodo}) => {
    const [todo, setTodo] = useState<ITodo>({id, comment, description});
    const [visible, setVisible] = useState<boolean>(false);

    const changeVisibility = useCallback(() => {
        setVisible(prevState => !prevState);
    }, []);

    const saveChanges = (todo: ITodo) => {
        setTodo(todo);
    }

    if (visible) {
        return <InputTodo
            todo={todo}
            saveChanges={saveChanges}
            changeVisibility={changeVisibility}
        />
    }

    return (
        <li className={cl.todo}>
            <input type="checkbox"/>
            <span className={cl.todo_value}>{todo.description}</span>
            <div className={cl.todo_mode}>
                <ButtonMiniIco ico={"edit"} onClick={changeVisibility}/>
                <ButtonMiniIco ico={"trash"} onClick={() => deleteTodo(todo.id!)}/>
                <ButtonMiniIco ico={"comment"} onClick={() => alert(2)}/>
                <ButtonMiniIco ico={"deadLine"} onClick={() => alert(3)}/>
            </div>
        </li>
    );
};

export default React.memo(Todo);
