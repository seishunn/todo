import React from 'react';
import cl from './InputLabel.module.scss';

interface IInputLabel {
    value: string
    changeValue: (str: string) => void
    placeholder?: string
    inputLabel?: string
    inputType: "text" | "password"
}

const InputLabel: React.FC<IInputLabel> = ({
                                               inputType, changeValue, value,
                                               inputLabel= "",placeholder = ""}) => {
    return (
        <label className={cl.label}>
            <span className={cl.label_title}>{inputLabel}</span>
            <input
                type={inputType}
                value={value}
                onChange={event => changeValue(event.target.value)}
                placeholder={placeholder}
            />
        </label>
    );
};

export default React.memo(InputLabel);
