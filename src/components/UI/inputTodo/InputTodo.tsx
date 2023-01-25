import React, {ChangeEvent, useRef, useState} from 'react';
import cl from "./InputTodo.module.scss";
import Button from "../button/Button";

interface IInputTodoProps {
    value: string
    saveChanges: (value: string) => void
    changeVisibility: () => void
}

const InputTodo: React.FC<IInputTodoProps> = ({value, saveChanges, changeVisibility}) => {
    const [inputValue, setInputValue] = useState(value);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const changeValueHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        setInputValue(textarea.value);

        if (textarea.scrollTop > 0) {
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }

    return (
        <li className={cl.inputTodo}>
            <div className={cl.inputTodo_editor}>
                <textarea autoFocus
                          style={{height: "20px"}}
                          value={inputValue}
                          ref={textareaRef}
                          onChange={event => changeValueHandler(event)}/>
            </div>
            <div className={cl.inputTodo_footer}>
                <Button buttonStyle={"grey"} onClick={changeVisibility}>Отмена</Button>
                <Button buttonStyle={"orange"} onClick={() => {
                    saveChanges(inputValue);
                    changeVisibility();
                }}>Сохранить</Button>
            </div>
        </li>
    );
};

export default  React.memo(InputTodo);
