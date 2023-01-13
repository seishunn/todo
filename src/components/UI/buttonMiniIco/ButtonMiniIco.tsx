import React from 'react';
import cl from './ButtonMiniIco.module.scss';
import {Icons} from "../../../assets/icons/Icons";

interface IButtonMiniIcoProps {
    ico: "edit" | "deadLine" | "comment" | "trash"
    [propName: string]: any
}

const ButtonMiniIco: React.FC<IButtonMiniIcoProps> = ({ico, ...props}) => {

    return (
        <button className={cl.button} {...props}>
            <span className={cl.button_info}>{Icons[ico].description()}</span>
            {Icons[ico].svg()}
        </button>
    );
};

export default ButtonMiniIco;
