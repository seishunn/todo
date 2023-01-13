import React, {ChangeEvent, useRef, useState} from 'react';
import cl from "./InputTodo.module.scss";
import Button from "../button/Button";
import {ITodo} from "../todo/Todo";

interface IInputTodoProps {
    todo: ITodo
    saveChanges: (todo: ITodo) => void
    changeVisibility: () => void
}

const InputTodo: React.FC<IInputTodoProps> = ({todo, saveChanges, changeVisibility}) => {
    const [newTodo, setNewTodo] = useState<ITodo>({...todo});
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const changeValueHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;

        setNewTodo({...newTodo, description: textarea.value});

        if (textarea.scrollTop > 0) {
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }

    return (
        <li className={cl.inputTodo}>
            <div className={cl.inputTodo_editor}>
                <textarea autoFocus
                          style={{height: "20px"}}
                          value={newTodo.description}
                          ref={textareaRef}
                          onChange={event => changeValueHandler(event)}/>
            </div>
            <div className={cl.inputTodo_footer}>
                <Button buttonStyle={"grey"} onClick={changeVisibility}>Отмена</Button>
                <Button buttonStyle={"orange"} onClick={() => {
                    saveChanges(newTodo);
                    setNewTodo({id: null, comment: "", description: ""});
                    changeVisibility();
                }}>Сохранить</Button>
            </div>
        </li>
    );
};

export default  React.memo(InputTodo);
