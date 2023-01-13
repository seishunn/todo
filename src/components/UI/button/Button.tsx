import React from 'react';
import cl from './Button.module.scss';
import classNames from "classnames";

interface IButtonProps {
    children: React.ReactNode
    buttonStyle: "grey" | "orange"
    [propName: string]: any
}

const Button: React.FC<IButtonProps> = ({children, buttonStyle, ...props}) => {
    return (
        <button className={classNames(
            cl.button,
            {[cl.button_orange]: buttonStyle === "orange"},
            {[cl.button_grey]: buttonStyle === "grey"}
        )} {...props}>
            {children}
        </button>
    );
};

export default React.memo(Button);
